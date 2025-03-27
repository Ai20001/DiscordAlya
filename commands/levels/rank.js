const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createRankCard } = require('../../utils/rank_card');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Показать ваш ранг или ранг другого пользователя')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Пользователь, чей ранг вы хотите увидеть')
                .setRequired(false)),

    async execute(interaction, client) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(targetUser.id);

        // Получаем данные пользователя из базы данных
        const userData = await client.db.get('SELECT * FROM levels WHERE user_id = ? AND guild_id = ?', 
            [targetUser.id, interaction.guild.id]);

        if (!userData) {
            return interaction.reply({
                content: '❌ У этого пользователя пока нет опыта!',
                ephemeral: true
            });
        }

        // Получаем позицию пользователя в таблице лидеров
        const leaderboard = await client.db.all(
            'SELECT user_id, xp FROM levels WHERE guild_id = ? ORDER BY xp DESC',
            [interaction.guild.id]
        );
        const position = leaderboard.findIndex(user => user.user_id === targetUser.id) + 1;

        // Создаем карточку ранга
        const rankCard = await createRankCard({
            username: member.displayName,
            avatar: member.user.displayAvatarURL({ dynamic: true }),
            currentXp: userData.xp,
            requiredXp: userData.level * 100,
            level: userData.level,
            rank: position,
            totalUsers: leaderboard.length
        });

        // Создаем эмбед
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Ранг ${member.displayName}`)
            .setDescription(`Уровень: ${userData.level}\nОпыт: ${userData.xp}/${userData.level * 100}\nПозиция: #${position}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        // Отправляем ответ
        await interaction.reply({
            embeds: [embed],
            files: [rankCard]
        });
    }
}; 