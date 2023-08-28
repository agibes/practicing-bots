const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Generates a random dad joke!'),
    async execute(interaction) {
        await interaction.deferReply();
        const response = await fetch('https://api.api-ninjas.com/v1/dadjokes?limit=1', {
            headers:  { 'X-Api-Key': `${process.env.APIKey}` },
            contentType: 'application/json'
        });
        const [joke] = await response.json();
        await interaction.editReply(`${joke.joke}`);
    }
};