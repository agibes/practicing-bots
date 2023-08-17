const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option=> 
            option.setName('target')
                .setDescription('The user to kick')
                .setRequired(true)
            ),
    async execute(interaction) {
        await interaction.deferReply();
        const target = interaction.options.getUser('target');
        if (!target) {
            interaction.editReply('You must select a user to kick');
            return;
            };
        await interaction.reply('Kicking user' + target.username);
        await interaction.guild.members.kick(target);
    },
};