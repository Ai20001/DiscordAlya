module.exports = {
    defaultSettings: {
        prefix: '>',
        djRole: 'DJ',
        adminRole: 'Admin',
        modRole: 'Moderator',
        welcomeChannel: 'welcome',
        logChannel: 'logs'
    },
    
    permissions: {
        ADMIN: ['ADMINISTRATOR'],
        MODERATOR: ['MANAGE_MESSAGES', 'KICK_MEMBERS'],
        DJ: ['CONNECT', 'SPEAK']
    }
}; 