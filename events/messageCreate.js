const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;
        if (!message.content.startsWith(process.env.PREFIX)) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands) {
            console.error('client.commands не определен');
            return;
        }

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(`Ошибка при выполнении команды ${commandName}:`, error);
            message.reply('❌ Произошла ошибка при выполнении команды!');
        }
    }
}; 