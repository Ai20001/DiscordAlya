const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Забанить пользователя')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Пользователь для бана')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Причина бана')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client) {
        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Причина не указана';

        // Проверяем, можем ли мы забанить пользователя
        const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
        
        if (targetMember) {
            if (!targetMember.bannable) {
                return interaction.reply({
                    content: '❌ Я не могу забанить этого пользователя!',
                    ephemeral: true
                });
            }

            if (targetMember.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({
                    content: '❌ Вы не можете забанить пользователя с ролью выше или равной вашей!',
                    ephemeral: true
                });
            }
        }

        try {
            // Баним пользователя
            await interaction.guild.members.ban(targetUser, { reason: reason });

            // Создаем эмбед
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('🔨 Пользователь забанен')
                .setDescription(`**Пользователь:** ${targetUser.tag}\n**ID:** ${targetUser.id}\n**Причина:** ${reason}\n**Модератор:** ${interaction.user.tag}`)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            // Отправляем ответ
            await interaction.reply({
                embeds: [embed]
            });

            // Логируем действие
            const logChannel = interaction.guild.channels.cache.find(ch => ch.name === 'mod-logs');
            if (logChannel) {
                await logChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ Произошла ошибка при попытке забанить пользователя!',
                ephemeral: true
            });
        }
    }
}; 