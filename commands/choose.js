const { prefix } = require('../config.json');
module.exports = {
	name: 'choose',
    description: 'Chooses an option that you sepertate with prefix',
    aliases: ['c'],
    usage: `<option 1 ${prefix} option 2>`,
    args: true,
	execute: async (message, args) => {
        args.pop()
		const options = args;
        message.channel.send(options[Math.floor(Math.random() * options.length)]);
	},
};