const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Воспроизвести музыку')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Название песни или URL')
                .setRequired(true)),
    name: 'play',
    description: 'Воспроизвести музыку',
    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            return await interaction.reply({
                content: '❌ Вы должны находиться в голосовом канале!',
                ephemeral: true
            });
        }

        await interaction.deferReply();

        const query = interaction.options.getString('query');
        const { player } = interaction.client;

        try {
            const result = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            });

            if (!result || !result.tracks.length) {
                return await interaction.editReply({
                    content: '❌ Не найдено результатов!',
                    ephemeral: true
                });
            }

            const song = result.tracks[0];
            const queue = await player.createQueue(interaction.guild, {
                metadata: interaction.channel
            });

            try {
                if (!queue.connection) {
                    await queue.connect(interaction.member.voice.channel);
                }
            } catch (error) {
                console.error('Ошибка подключения к голосовому каналу:', error);
                player.deleteQueue(interaction.guildId);
                return await interaction.editReply({
                    content: '❌ Не удалось присоединиться к голосовому каналу!',
                    ephemeral: true
                });
            }

            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('🎵 Добавлен трек')
                .setDescription(`**${song.title}**`)
                .addFields(
                    { name: 'Длительность', value: song.duration, inline: true },
                    { name: 'Запросил', value: interaction.user.tag, inline: true }
                )
                .setThumbnail(song.thumbnail)
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
            queue.addTrack(song);

            if (!queue.playing) await queue.play();
        } catch (error) {
            console.error('Ошибка воспроизведения:', error);
            await interaction.editReply({
                content: '❌ Произошла ошибка при выполнении команды!',
                ephemeral: true
            });
        }
    },
}; 