Purpose: to make a discord bot

I will be using the discord.js library and following the discord.js Guide and github documentation

The invite link: https://discord.com/api/oauth2/authorize?client_id=1141111301242888317&permissions=2415986690&scope=applications.commands%20bot

Steps:

A token was generated in the discord developer portal, scope was assigned to bot, and bot permissions were assigned according to the necessary intents

Event listeners were created for when the client is ready and for when an interaciton is received

The individual command files were written (with API integration) and the command handler was created (to dynamically read the files and execute the commands)

The command deployment script was written to register slash commands with Discord so they appear in the interface

the messageCreate event listener was implemented to moderate bad words in chat using the bad-words package

the kick/addrole/removerole slash commands were implemented for users with adequate permissions

Notes:

node's fs modules (file system module) is used to read the commands directoy and identify command files
node's path module (path utility module) constructs paths to access files and directories
the Collection class is used to store and retrieve commands for execution

API for factoid.js: https://api-ninjas.com/api/facts