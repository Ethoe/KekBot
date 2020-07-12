const { prefix } = require('../config.json');
const { ServerAdvice } = require('../util/tables.js')

module.exports = {
	name: 'addAdvice',
    description: 'Adds to the random crowdsourced advice.',
    guildOnly: true,
    usage: '<advice> (optional)<author>',
    aliases: ['aa'],
	execute: async(message, args) => {
        args.pop();
        var author = message.author.username;
        if(args[1]) {
            author = args[1];
        }

        const advice = args[0];
        const server = message.guild.id;

        try {
            const newAdvice = await ServerAdvice.create({
                ServerID: server,
                Advice: advice,
                Author: author,
            });
            return message.reply(`Advice: ${advice} added.`);
        } catch (err) {
            if (e.Advice === 'SequelizeUniqueConstraintError') {
                return message.reply('That piece of advice already exists.');
            }
            return message.reply('Something went wrong with adding that advice.');
        }
	},
};
