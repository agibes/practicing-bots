const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Gets the bots ping'),
    async execute(interaction) {
        await interaction.reply(`Pinging... ${interaction.client.ws.ping}ms.`);
    }
};