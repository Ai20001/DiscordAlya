const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require('discord.js');
const { Player } = require('discord-player');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
});

const player = new Player(client);
const playlists = new Map();
const volume = new Map();
const loops = new Map();
const favorites = new Map();

client.commands = new Collection();
client.aliases = new Collection();

// Загрузка команд
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[INFO] Загружена команда ${command.data.name}`);
        } else {
            console.log(`[WARNING] Команда ${filePath} не содержит необходимых свойств "data" или "execute"`);
        }
    }
}

// Загрузка событий
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
    console.log(`[INFO] Загружено событие ${event.name}`);
}

// Загрузка сохраненных плейлистов
async function loadPlaylists() {
    try {
        const data = await fs.promises.readFile('playlists.json', 'utf8');
        const loadedPlaylists = JSON.parse(data);
        Object.entries(loadedPlaylists).forEach(([key, value]) => {
            playlists.set(key, value);
        });
    } catch (error) {
        console.error('Ошибка при загрузке плейлистов:', error);
    }
}

client.once('ready', () => {
    console.log(`Бот ${client.user.tag} готов к работе!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        switch (command) {
            // Основные команды воспроизведения
            case 'play': await handlePlay(message, args); break;
            case 'stop': await handleStop(message); break;
            case 'skip': await handleSkip(message); break;
            case 'queue': await handleQueue(message); break;
            case 'pause': await handlePause(message); break;
            case 'resume': await handleResume(message); break;
            
            // Команды управления громкостью
            case 'volume': await handleVolume(message, args); break;
            case 'volumeup': await adjustVolume(message, 10); break;
            case 'volumedown': await adjustVolume(message, -10); break;
            
            // Команды для плейлистов
            case 'playlist': await handlePlaylist(message, args); break;
            case 'save': await savePlaylist(message, args); break;
            case 'load': await loadPlaylist(message, args); break;
            case 'delete': await deletePlaylist(message, args); break;
            case 'playlists': await showPlaylists(message); break;
            
            // Команды управления очередью
            case 'clear': await clearQueue(message); break;
            case 'shuffle': await shuffleQueue(message); break;
            case 'remove': await removeTrack(message, args); break;
            case 'move': await moveTrack(message, args); break;
            
            // Команды повтора
            case 'loop': await toggleLoop(message); break;
            case 'loopqueue': await toggleQueueLoop(message); break;
            
            // Информационные команды
            case 'np': await nowPlaying(message); break;
            case 'search': await searchTracks(message, args); break;
            case 'lyrics': await showLyrics(message); break;
            case 'info': await showTrackInfo(message); break;
            
            // Команды избранного
            case 'favorite': await addFavorite(message); break;
            case 'favorites': await showFavorites(message); break;
            case 'playfav': await playFavorites(message); break;
            
            // Команды эффектов
            case 'bass': await setBassBoost(message, args); break;
            case 'speed': await setSpeed(message, args); break;
            case 'nightcore': await toggleNightcore(message); break;
            case '8d': await toggle8D(message); break;
            
            // Системные команды
            case 'help': await showHelp(message); break;
            case 'ping': await showPing(message); break;
            case 'stats': await showStats(message); break;
        }
    } catch (error) {
        console.error(error);
        message.reply('Произошла ошибка при выполнении команды!');
    }
});

// Новые функции обработки команд

async function handleVolume(message, args) {
    const queue = player.getQueue(message.guild.id);
    if (!queue) return message.reply('Сейчас ничего не играет!');

    const vol = parseInt(args[0]);
    if (isNaN(vol) || vol < 0 || vol > 200) {
        return message.reply('Укажите громкость от 0 до 200!');
    }

    queue.setVolume(vol);
    volume.set(message.guild.id, vol);
    message.reply(`🔊 Громкость установлена на ${vol}%`);
}

async function savePlaylist(message, args) {
    if (!args.length) return message.reply('Укажите название плейлиста!');

    const queue = player.getQueue(message.guild.id);
    if (!queue) return message.reply('Очередь пуста!');

    const name = args.join(' ');
    const tracks = queue.tracks.map(track => ({
        title: track.title,
        url: track.url
    }));

    playlists.set(`${message.guild.id}-${name}`, tracks);
    await savePlaylists();

    message.reply(`✅ Плейлист "${name}" сохранен!`);
}

async function showTrackInfo(message) {
    const queue = player.getQueue(message.guild.id);
    if (!queue || !queue.current) return message.reply('Сейчас ничего не играет!');

    const track = queue.current;
    const embed = new EmbedBuilder()
        .setTitle('🎵 Информация о треке')
        .setColor('#0099ff')
        .addFields(
            { name: 'Название', value: track.title },
            { name: 'Автор', value: track.author },
            { name: 'Длительность', value: track.duration },
            { name: 'Просмотры', value: track.views?.toString() || 'Н/Д' },
            { name: 'URL', value: track.url }
        )
        .setThumbnail(track.thumbnail);

    message.reply({ embeds: [embed] });
}

async function toggleNightcore(message) {
    const queue = player.getQueue(message.guild.id);
    if (!queue) return message.reply('Сейчас ничего не играет!');

    const filter = queue.getFiltersEnabled().includes('nightcore');
    await queue.setFilter('nightcore', !filter);
    message.reply(`🎵 Nightcore режим ${!filter ? 'включен' : 'выключен'}`);
}

async function searchTracks(message, args) {
    if (!args.length) return message.reply('Укажите запрос для поиска!');

    const query = args.join(' ');
    const results = await player.search(query);

    if (!results.tracks.length) {
        return message.reply('Ничего не найдено!');
    }

    const embed = new EmbedBuilder()
        .setTitle('🔍 Результаты поиска')
        .setColor('#0099ff')
        .setDescription(
            results.tracks.slice(0, 10).map((track, i) => 
                `${i + 1}. **${track.title}** - ${track.author}`
            ).join('\n')
        );

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('1')
                .setLabel('1')
                .setStyle(ButtonStyle.Primary),
            // Добавьте больше кнопок для других треков
        );

    message.reply({ embeds: [embed], components: [row] });
}

async function showStats(message) {
    const guilds = client.guilds.cache.size;
    const channels = client.channels.cache.size;
    const users = client.users.cache.size;
    const queues = player.queues.size;

    const embed = new EmbedBuilder()
        .setTitle('📊 Статистика бота')
        .setColor('#0099ff')
        .addFields(
            { name: 'Серверов', value: guilds.toString() },
            { name: 'Каналов', value: channels.toString() },
            { name: 'Пользователей', value: users.toString() },
            { name: 'Активных очередей', value: queues.toString() },
            { name: 'Время работы', value: formatUptime(client.uptime) }
        );

    message.reply({ embeds: [embed] });
}

// Вспомогательные функции

async function savePlaylists() {
    const data = {};
    playlists.forEach((value, key) => {
        data[key] = value;
    });
    await fs.promises.writeFile('playlists.json', JSON.stringify(data, null, 2));
}

function formatUptime(uptime) {
    const days = Math.floor(uptime / 86400000);
    const hours = Math.floor(uptime / 3600000) % 24;
    const minutes = Math.floor(uptime / 60000) % 60;
    return `${days}д ${hours}ч ${minutes}м`;
}

// Обработчики событий плеера
player.on('trackStart', (queue, track) => {
    const embed = new EmbedBuilder()
        .setTitle('🎵 Сейчас играет')
        .setDescription(`**${track.title}**\nДобавил: ${track.requestedBy}`)
        .setColor('#00ff00')
        .setThumbnail(track.thumbnail);

    queue.metadata.channel.send({ embeds: [embed] });
});

player.on('error', (queue, error) => {
    console.error(error);
    queue.metadata.channel.send('Произошла ошибка при воспроизведении!');
});

// Инициализация бота
async function initialize() {
    try {
        console.log('[INFO] Начало инициализации бота...');
        await loadPlaylists();
        await client.login(process.env.TOKEN);
        console.log('✅ Бот успешно запущен!');
    } catch (error) {
        console.error('❌ Ошибка при инициализации бота:', error);
    }
}

// Обработка ошибок
process.on('unhandledRejection', error => {
    console.error('[ERROR] Необработанная ошибка:', error);
});

// Запускаем бота
initialize(); 