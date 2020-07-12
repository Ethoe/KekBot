module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute: async (message, args) => {
		message.channel.send('Pong.');
	},
};