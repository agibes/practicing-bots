const { Events } = require('discord.js');
const Filter = require('bad-words'),
	  filter = new Filter();
module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;
		try {
			if (filter.isProfane(message.content)) {
				await message.reply(`Hey there, server dwellers! It seems a couple of not-so-friendly words snuck into our chat - but no worries, bot bot is here to keep things fun and friendly for everyone!\n` + message.author.username + ` meant to say: "` + filter.clean(message.content) + `"`);
				message.delete();
			}
		} catch (error) {
			console.error(`Error executing message moderation`);
			console.error(error);
		}
	},
};