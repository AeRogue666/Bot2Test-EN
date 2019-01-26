/*
Welcome to the main file of your bot. This is a bit like the matrix of the bot.
You will find below all the explanations concerning each function of the bot
and how to modify them correctly.
*/

const Discord = require("discord.js"); //Requiring the module discord.js to run the bot under Discord we call it. You will need to install it by doing npm i discord.js in a command prompt (cmd).
const client = new Discord.Client(); //This is the customer. It is often called "bot" in the bots you can download on github but I prefer to put client to make it more understandable.
const moment = require("moment");

const config = require('./config.json'); 
/*Requiring a file containing sensitive bot information such as token or owner ID, 
we call on the latter to benefit from this content without putting it legibly in the bot code.
This prevents us from having private and/or sensitive information that is in the bot code and someone with bad intentions stealing your bot (don't laugh, it happens regularly this kind of problem)*/

client.login(config.token) //We call for the token of the bot.

//Below we create a constant that starts when the bot is started (hence the client.on) It performs a start with information display in the console as well as on Discord.
client.on("ready", function() {
    var clientcharge = `
------------------------------------------------------
> Lancement en cours...
------------------------------------------------------
${client.user.tag} s'est correctement lancé !
Il est actuellement connecté sur ${client.guilds.size} serveur(s)
ainsi que ${client.channels.size} canaux
Il y a ${client.users.size} utilisateurs 
qui peuvent potentiellement utiliser le bot !
LET'S GO!
------------------------------------------------------
---------- Bot de Test créé par AeRogue --------------
------------------------------------------------------
----------------- Logs du Bot ------------------------`

    console.log(clientcharge); //We use the clientcharge variable we created above. The text it contains will be displayed in the console.
	
    //Here we define an infinite loop of "games" that will scroll under the bot's nickname. For example: Play to put winds (it's free)
    let statusArray = [
        `${config.prefix}help | Watch ${client.guilds.size} servers!`, //You can change the games! :D
		`${config.prefix}help | ${client.user.username} version ${config.version} !`,
        `${config.prefix}help | Has ${client.users.size} members!`,
		`${config.prefix}help | ${client.user.username} - Best Bot Ever`
	];
	
	setInterval(function() {
	client.user.setPresence({
        game: { 
            name: `${statusArray[~~(Math.random() * statusArray.length)]}`, //We call statusArray and randomly execute one of the above games.
			url:"https://twitch.tv/lebot", //This allows you to display the bot with a Twitch banner on Discord. You can delete it altogether but you should also edit it below.
            type: 'STREAMING' //Here we declare that the bot is in stream mode. It will therefore display that it is in full stream which allows the display of a purple background as on Twitch behind the bot. You can replace STREAMING with WATCHING, this will display "Play at".
        },
        status: 'online' //This defines the status of the bot. Online, idle, offline or dnd. 
    })
	 }, 3000); //This is a timer that allows you to change the game at regular intervals. Here it is set to 3 seconds.
});

client.on("message", async message => {

 var args = message.content.substring(config.prefix.length).split(" ");

switch (args[0]) {
case "help":
case "?":
console.log(`${message.author.tag} use ${config.prefix}help !`);
    
    message.reply("Please check your private messages :inbox_tray:");

    message.author.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: `Commandes de ${config.BotName}`,
        fields: [{
            name: "Aide du Bot",
            value: `**${config.prefix}help [?]** - Allows you to display this help
**${config.prefix}botinfo [bi]** - Allows you to display information about the bot
**${config.prefix}invite** - Allows you to invite the bot`
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: `© ${config.BotName}`
        }
      }
    });
        break;
case"botinfo":
case"bi":
console.log(` ${message.author.tag} use ${config.prefix}botinfo !`);

		
        message.channel.send({embed: {
            color: 3447003,
            title: "Information about the test bot",
            description: "Here is the information about the test bot",
            fields: [{
                name: "Creator :",
                value: `${config.OwnerName}`
              },
              {
                name: `__Official invitation to join the ${config.BotName} :__ 》`,
                value: "https://discord.gg/Invitetoyourserver"
              },
              {
                name: `To invite ${config.BotName} :`,
                value: "[:robot:](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=" + config.nivperms + ") :arrow_left:  Click on the robot"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: `© ${config.BotName}`
            }
          }
        });
break;
case "invite":
case "inv":
console.log(` ${message.author.tag} use ${config.prefix}invite !`);
message.reply("You want to invite my bot to your Discord? No problem! No problem! Click on the link --> https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=" + config.nivperms);
break;
 }	
});