const Discord = require('discord.js');
const { sequelize, ServerAdvice } = require('../util/tables.js')

module.exports = {
	name: 'fortune',
    description: 'Gives your fortune number',
    aliases: ['f'],
	execute: async (message, args) => {
		const date = new Date();
		const seed = parseInt(message.author.id.slice(0, 8)) + (date.getDate() * date.getMonth());
		const advice = await ServerAdvice.findOne({
			order: sequelize.random(),
		});
		if (advice) {
			var advices = '"' + advice.get('Advice') + '"';
			var author = '-' + advice.get('Author');
		} else {
			var advices = 'No advice found, uh oh';
			var author = 'idk you arent supposed to see this';
		}
		var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		const FortuneEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Fortune Cookie for Today!')
			.setDescription(`Get your lucky number and some advice for ${weekday[date.getDay()]}!`)
			.setThumbnail('https://tankinz.com/wp-content/uploads/2018/10/giantbig.jpg')
			.addFields(
				{ name: 'Lucky Number!', value: `${ Math.floor(seed % 100) + 1 }` },
				{ name: advices, value: author },
			)
			.setTimestamp()
			
		message.channel.send(FortuneEmbed);
	},
};