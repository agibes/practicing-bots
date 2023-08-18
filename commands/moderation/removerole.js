const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription(`Remove a member's role`)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option=> 
            option.setName('target')
                .setDescription('The member to remove a role from')
                .setRequired(true)
            )
        .addStringOption(option=>
            option.setName('role')
            .setDescription('The role to remove')
            .setRequired(true)
            .addChoices(
                {name: 'Noble', value: 'Noble'},
                {name: 'Lord Justice', value: 'Lord Justice'},
                {name: 'Citizen', value: 'Citizen'},
                {name: 'Traveler', value: 'Traveler'},
                {name: 'Outlaw', value: 'Outlaw'},
            )
            ),
    async execute(interaction) {
        await interaction.deferReply();
        const target = interaction.options.getUser('target');
        const role = interaction.options.getString('role');
        if (!target || !role) {
            interaction.editReply('You must select a user and a role');
            return;
            };

        const roleclass = interaction.guild.roles.cache.find(r => r.name === role);
        const member = await interaction.guild.members.fetch(target.id);

        if (member === interaction.guild.fetchOwner()) {
            await interaction.editReply(`You can't change the guild owner's role!`);
            return;
            }

        const targetRoleRank = member.roles.highest.position;
        const requestRoleRank = interaction.member.roles.highest.position;
        if (targetRoleRank >= requestRoleRank) {
            await interaction.editReply(`You can't remove a role from a user with the same/higher rank than you!`);
            return;
            };

        member.roles.remove(roleclass);
        if(member.roles.cache.some(r => r.name != role)) {
            await interaction.editReply('Update: ' + target.username + ' is not a ' + role + ' anymore!'); 
        } else {
            await interaction.editReply(`Sorry, I couldn't remove that role for you.`);
            };
    },
};