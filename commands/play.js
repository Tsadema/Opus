const path = require('path');

module.exports = {
    name: 'play',
    async execute(client, message) {
        try { require.resolve('opusscript'); }
        catch (err2) { return console.error('> "opusscript" is not installed.'); }

        
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.reply('you must be in a voice channel to use that command.');
        const connection = await voiceChannel.join();
        const dispatcher = await connection.playFile('../assets/rickroll.mp3');

        dispatcher.on('end', () => {
            voiceChannel.leave();
        })
        .on('error', err => {
            console.error(err);
        });
    }
};
