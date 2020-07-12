const { sequelize, Riddles } = require('../util/tables.js')

module.exports = {
	name: 'riddle',
    description: 'Gives a random crowdsourced riddle. Use arg g or global to get advice from everyone who uses the bot.',
    guildOnly: true,
    usage: '<g or global>',
    aliases: ['r'],
	execute(message, args) {
        
	},
};
