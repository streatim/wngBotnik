//Set up required packages and files.
const Discord = require('discord.js');
const config = require('./auth.json');
const fs = require('fs');

//Authenticate into the Discord Client.
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.login(config.token);

//Require all Wraith and Glory command files.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
	const command = require(`./commands/${file}`);

	//Add the command to the command list.
	bot.commands.set(command.name, command);
}

//Including Pathfinder Files.
const pfroll = require('./pathfinder/commands/pfroll.js');
const pfhelp = require('./pathfinder/commands/pfhelp.js');
const pfff = require('./pathfinder/commands/pfinsult.js');

//Listen to messages for potential commands.
bot.on('message', msg=> {	
	if(msg.content.startsWith('!wg')){	
		//Gather everything after the ! but excluding any spaces. All commands can be expected to be !{command} {extra info for command}. Will sanitize the context in each function.
		let msgCommand = msg.content.substring(1).split(' ')[0].toLowerCase();
		let msgContext = msg.content.substring(msgCommand.length+4).toLowerCase();
		
		//Check to see what the command was. If it's an existing command, run that command and report back the result. Otherwise, run a basic help command with no context.
		if(!bot.commands.has(msgCommand)){
			return;
		} else {
			try {
				bot.commands.get(command).execute(msgContext);
			} catch (error) {
				console.error(error);
				message.reply('there was an error trying to execute that command!');
			}
		}
	}else{
		if(msg.content.startsWith('!pf')){
			//Deal with Eric's comment. :D
			const pfCommands = ['roll', 'help', 'test'];
			let msgCommand = '';
			let msgContext = '';
			let ericAdd = '';
			let testmsg = msg.content.substring(3).split(' ')[0].toLowerCase();
			if(pfCommands.indexOf(testmsg)!==-1){
				msgCommand = msg.content.substring(3).split(' ')[0].toLowerCase();
				msgContext = msg.content.substring(msgCommand.length+4).toLowerCase();				
			}else{
				msgCommand = msg.content.substring(3,7).toLowerCase();
				msgContext = msg.content.substring(msgCommand.length+3).toLowerCase();
				ericAdd = '\r *this only works because **Eric** said it should*';				
			}
		
			switch (msgCommand){
				case 'roll':
					return msg.channel.send(msg.author.toString()+' ('+msg.content+') \r'+pfroll(msgContext)+ericAdd);
				case 'help':
					return msg.channel.send(msg.author.toString()+' ('+msg.content+') \r'+pfhelp(msgContext)+ericAdd);					
				default:
					return msg.channel.send(pfff(msg.author.toString()));
			}
		}
	}	
});
