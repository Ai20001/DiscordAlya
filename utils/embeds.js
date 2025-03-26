const { EmbedBuilder } = require('discord.js');

module.exports = {
    errorEmbed: (message) => {
        return new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('❌ Ошибка')
            .setDescription(message);
    },
    
    successEmbed: (message) => {
        return new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('✅ Успешно')
            .setDescription(message);
    }
}; 