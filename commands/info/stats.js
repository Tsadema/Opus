const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'stats',
    aliases: ['info'],
    execute(client, message) {
        message.channel.send(`\`\`\`\nCreated: ${client.user.createdAt}\nHeap Usage: ${Math.round(process.memoryUsage().heapUsed / 1048576)}mb\nUptime: ${formatTime(process.uptime())}\n\`\`\``)
    }
};

function formatTime(milliseconds) {
    const sec_num = parseInt(milliseconds, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = `0${hours}`; }
    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
}