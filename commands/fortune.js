module.exports = {
	name: 'fortune',
    description: 'Gives your fortune number',
    aliases: ['f'],
	execute: async (message, args) => {
		message.channel.send(`Your fortune number for today is ${ Math.floor(Math.random() * 100) }!`);
	},
};