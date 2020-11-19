const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands'],

    execute(client, message) {
        message.channel.send('You humans need help? Look below.\n```\nPing: You can use this to test latency.\nPlay: Plays a random song in the current voice channel.\nStats: Shows stats about me.\nHelp: Shows this message.\n```')
    }
};
