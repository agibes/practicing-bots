const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('factoid')
        .setDescription('Generates a fun fact!'),
    async execute(interaction) {
        await interaction.deferReply();
        const response = await fetch('https://api.api-ninjas.com/v1/facts?limit=1', {
            headers:  { 'X-Api-Key': `${process.env.APIKey}` },
            contentType: 'application/json'
        });
        const [fact] = await response.json();
        await interaction.editReply(`Fun Fact: ${fact.fact}!`);
    }
};