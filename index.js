const { Client, Collection } = require('discord.js');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

const config = require('./config.json');
const client = new Client();


client.commands = new Collection();
client.aliases = new Collection();


let status = ["skynet simulator | >help", "world domination simulator | >help", "in your filesystem | >help", "in the basement | >help"];


function loadCommands(cmdDir) {
    const items = [];
    items.push(...glob.sync(`${path.join(__dirname, cmdDir)}/**/*.js`));

    for (const item of items) {
        if (require.cache[require.resolve(item)]) delete require.cache[require.resolve(item)];

        const command = require(item);
        client.commands.set(command.name, command);
        if (command.aliases) {
            for (const alias of command.aliases) {
                client.aliases.set(alias, command.name);
            }
        }
    }
    console.log(chalk.greenBright('\nLoaded commands!'));
}
loadCommands('commands');


client.on('ready', () => {
    console.log(chalk.greenBright('\nLogged in as'), chalk.magentaBright(`${client.user.tag}`));
})


setInterval(function() {
    console.log(chalk.greenBright("\nSetting status..."));
    client.user.setActivity(status[Math.floor(Math.random() * status.length).toString(16)], { type: 'PLAYING'})
        .then(presence => console.log(chalk.greenBright(`Activity set to:`), chalk.magentaBright(`${presence.activities[0].name}`)))
        .catch(console.error);
}, 30000);


client.on('message', message => {
    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;


    const cmd = message.content.split(/\s+/g)[0].slice(config.prefix.length);
    const args = message.content.split(/\s+/g).slice(1);

    try {
        let command;
        if (client.commands.has(cmd)) {
            command = client.commands.get(cmd);
        } else if (client.aliases.has(cmd)) {
            command = client.commands.get(client.aliases.get(cmd));
        }

        if (!command) return;

        command.execute(client, message, args);
        console.log(chalk.greenBright(`\nRan command: `), chalk.magentaBright(`${command.name}`)); // Print the command that was executed.
    } catch (err) {
        console.error(err);
    }
});


client.login(config.token);