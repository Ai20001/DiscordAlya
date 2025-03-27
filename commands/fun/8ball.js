const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Задайте вопрос магическому шару')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Ваш вопрос')
                .setRequired(true)),

    async execute(interaction, client) {
        const question = interaction.options.getString('question');
        
        // Массив возможных ответов
        const answers = [
            'Бесспорно!',
            'Определённо да!',
            'Вероятнее всего.',
            'Хорошие перспективы.',
            'Знаки говорят - да!',
            'Да.',
            'Сконцентрируйся и спроси опять.',
            'Спроси позже.',
            'Лучше не рассказывать.',
            'Сейчас нельзя предсказать.',
            'Медленнее, пожалуйста.',
            'Спроси снова позже.',
            'Не рассчитывай на это.',
            'Мой ответ - нет.',
            'По моим данным - нет.',
            'Перспективы не очень хорошие.',
            'Весьма сомнительно.'
        ];

        // Выбираем случайный ответ
        const answer = answers[Math.floor(Math.random() * answers.length)];

        // Создаем эмбед
        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle('🎱 Магический шар')
            .setDescription(`**Вопрос:** ${question}\n\n**Ответ:** ${answer}`)
            .setThumbnail('https://i.imgur.com/8tBXT9I.png')
            .setTimestamp();

        // Отправляем ответ
        await interaction.reply({
            embeds: [embed]
        });
    }
}; 