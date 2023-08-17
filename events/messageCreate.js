const { Events } = require('discord.js');
const Filter = require('bad-words'),
	  filter = new Filter();
module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        if (message.author.bot) return;
		if (filter.isProfane(message.content)) {
			message.delete()
			message.reply(`Hey there, server dwellers! It seems a couple of not-so-friendly words snuck into our chat - but no worries bot bot is here to keep things fun and friendly for everyone!\n` + message.author.username + ` meant to say: "` + filter.clean(message.content) + `"`);
		}
		try {
			if (message.content === 'asd') {
				console.log('testing');
				message.reply("Hi! What's your name?");
			}
		} catch (error) {
			console.error(`Error executing ${message.commandName}`);
			console.error(error);
		}
	},
};