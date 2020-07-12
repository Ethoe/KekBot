const { sequelize, ServerAdvice } = require('../util/tables.js')

module.exports = {
	name: 'advice',
    description: 'Gives random crowdsourced advice. Use arg g or global to get advice from everyone who uses the bot.',
    guildOnly: true,
    usage: '<g or global>',
    aliases: ['a'],
	execute: async(message, args) => {
        args.pop();
        if (!args.length) {
            const server = message.guild.id;
            const advice = await ServerAdvice.findOne({
                where: { ServerID: server },
                order: sequelize.random(),
            });
            if (advice) {
                return message.channel.send('"' + advice.get('Advice') + '" -' + advice.get('Author'));
            }
            return message.reply('No advice found for this server.')
        } 
        const arg1 = args[0].toLowerCase();
        if (arg1 === 'g' || arg1 === 'global' || arg1 == 'gl') {
            const advice = await ServerAdvice.findOne({
                order: sequelize.random(),
            });
            if (advice) {
                return message.channel.send('"' + advice.get('Advice') + '" -' + advice.get('Author'));
            }
            return message.reply('No advice found globally.')
        }
	},
};
