const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`✅ Бот ${client.user.tag} успешно запущен!`);
        client.user.setPresence({
            activities: [{ 
                name: '/help | Музыка',
                type: ActivityType.Listening
            }],
            status: 'online'
        });
    },
}; 