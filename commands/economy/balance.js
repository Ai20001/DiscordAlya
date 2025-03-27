const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Проверить ваш баланс или баланс другого пользователя')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Пользователь, чей баланс вы хотите увидеть')
                .setRequired(false)),

    async execute(interaction, client) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(targetUser.id);

        // Получаем данные пользователя из базы данных
        const userData = await client.db.get('SELECT * FROM economy WHERE user_id = ? AND guild_id = ?', 
            [targetUser.id, interaction.guild.id]);

        if (!userData) {
            // Если пользователя нет в базе, создаем запись
            await client.db.run(
                'INSERT INTO economy (user_id, guild_id, balance, bank) VALUES (?, ?, ?, ?)',
                [targetUser.id, interaction.guild.id, 0, 0]
            );
            return interaction.reply({
                content: '❌ У этого пользователя пока нет денег!',
                ephemeral: true
            });
        }

        // Создаем эмбед
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(`💰 Баланс ${member.displayName}`)
            .setDescription(`**Наличные:** ${userData.balance} монет\n**В банке:** ${userData.bank} монет\n**Всего:** ${userData.balance + userData.bank} монет`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        // Отправляем ответ
        await interaction.reply({
            embeds: [embed]
        });
    }
}; 