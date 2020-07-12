module.exports = {
	name: 'dice',
    description: 'Rolls a dice of argumented number, or default 6',
    usage: '<number of sides>',
    aliases: ['d'],
	execute: async (message, args) => {
        args.pop();
        var number;
        if (!args.length) number = 6;
        else number = args[0];
		message.channel.send(`Rolled a ${ Math.floor(Math.random() * number) + 1 }!`);
	},
};