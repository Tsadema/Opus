module.exports = {
    name: 'ping',
    aliases: ['latency'],

    execute(client, message) {
        message.channel.send('Pinging...')
        .then(sentMsg => {
            sentMsg.edit(`:ping_pong: Pong. Took \`${sentMsg.createdTimestamp - message.createdTimestamp}ms\`.`);
        });
    }
};