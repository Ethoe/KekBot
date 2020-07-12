const Discord = require('discord.js');
const fs = require('fs');
const { ServerAdvice, Riddles } = require('./util/tables.js')
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
}

client.once('ready', () => {
    console.log('Ready!');
    ServerAdvice.sync();
    console.log('ServerAdvice initilized.');
    Riddles.sync();
    console.log('Riddles initilized.')
});

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const tokenized = message.content.slice(prefix.length).split(' ', 1);
    const commandName = tokenized.shift().toLowerCase();
    const args = message.content.slice(prefix.length +  commandName.length + 1).split(prefix);
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply =  `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage is: \`${prefix}${commandName} ${command.usage}\``
        }

        return message.channel.send(reply);
    }

    try {
        args.push(commandName);
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);