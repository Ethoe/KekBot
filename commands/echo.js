const { prefix } = require('../config.json');

module.exports = {
	name: 'echo',
	description: 'Echos whatever is typed.',
	usage: '<whatever you want echoed>',
    aliases: ['e'],
    args: true,
	execute: async (message, args) => {
		message.channel.send(args[0]);
	},
};