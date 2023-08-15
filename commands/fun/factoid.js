const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('factoid')
        .setDescription('Generates a fun fact!'),
    async execute(interaction) {
        return interaction.reply('Fun Fact (coming soon)!');
    }
};