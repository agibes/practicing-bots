const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Give a member role')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option=> 
            option.setName('target')
                .setDescription('The member to give a role to')
                .setRequired(true)
            )
        .addStringOption(option=>
            option.setName('role')
            .setDescription('The role to give')
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
        const role = interaction.options.getString('role')
        if (!target || !role) {
            interaction.editReply('You must select a user and a role');
            return;
            };
        const roleclass = interaction.guild.roles.cache.find(r => r.name === role);
        const member = await interaction.guild.members.fetch(target.id);
        member.roles.add(roleclass);
        if(member.roles.cache.some(r => r.name === role)) {
            await interaction.editReply('Wow! ' + target.username + ' is now a ' + role + '!'); 
        }
    },
};
