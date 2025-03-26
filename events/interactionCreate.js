module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Команда ${interaction.commandName} не найдена.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Ошибка при выполнении команды ${interaction.commandName}:`, error);
            const errorMessage = {
                content: '❌ Произошла ошибка при выполнении команды!',
                ephemeral: true
            };
            
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    },
}; 