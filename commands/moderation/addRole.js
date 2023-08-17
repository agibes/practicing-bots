const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addRole')
        .setDescription('Adds a role to a target user (Mod in this case)')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option=> 
            option.setName('target')
                .setDescription('The user to give a role to')
                .setRequired(true)
            ),
    async execute(interaction) {
        await interaction.deferReply();
        const target = interaction.options.getUser('target');
        if (!target) {
            interaction.editReply('You must select a user to give the role to');
            return;
            };
        let role = interaction.guild.roles.cache.find(r => r.name === 'Mod');
        await interaction.reply('Adding role "' + role.name + '" to user ' + target.username);
        await target.roles.add(role).catch(console.error);
    },
};