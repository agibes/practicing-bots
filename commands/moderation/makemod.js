const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('makemod')
        .setDescription('Give a member role: Mod')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option=> 
            option.setName('target')
                .setDescription('The member to give a role to')
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
        const member = await interaction.guild.members.fetch(target.id);
        member.roles.add(role);
        if(member.roles.cache.some(role=>role.name === 'Mod')) {
            await interaction.editReply('Wow! ' + target.username + ' is now a ' + role.name + '!'); 
        }
    },
};
