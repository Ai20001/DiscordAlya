const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Показывает список всех команд'),
    name: 'help',
    description: 'Показывает список всех команд',
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('📚 Список команд')
            .setDescription('Вот все доступные команды:')
            .addFields(
                { name: '🎵 Музыка', value: '`/play <название/URL>` - Воспроизвести музыку\n`/skip` - Пропустить текущий трек\n`/stop` - Остановить воспроизведение\n`/queue` - Показать очередь воспроизведения' },
                { name: '💰 Экономика', value: '`/balance` - Проверить баланс\n`/daily` - Получить ежедневную награду\n`/work` - Заработать монеты' },
                { name: '👑 Административные', value: '`/kick <@пользователь> [причина]` - Кикнуть пользователя\n`/ban <@пользователь> [причина]` - Забанить пользователя\n`/clear <количество>` - Очистить сообщения' }
            )
            .setFooter({ text: 'Используйте /help <команда> для подробной информации о команде' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
}; 