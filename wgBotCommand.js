//Set up required packages and files.
const Discord = require('discord.js');
const {prefixes, token} = require('./auth.json');
const fs = require('fs');
const defResponse = require('./defResponse.js');

//Authenticate into the Discord Client.
const bot = new Discord.Client();
bot.login(token);

//Dynamically require all command files.
bot.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
	for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles){
		const command = require(`./commands/${folder}/${file}`);
		for(const prefixes of command.prefix){
			bot.commands.set(prefixes+command.name, command);
		}
	}
}


//Listen to messages for potential commands.
bot.on('message', msg=> {
	const prefix = prefixes.find(p => msg.content.startsWith(p));
	if(prefix){
		//An expected prefix has been found! Now to find a command.
		let msgCommand = bot.commands.find(cmd => msg.content.startsWith(prefix+cmd.name));
		if(!msgCommand){
			return msg.channel.send(defResponse(msg.author.toString(), prefix));
		}
		let cmdLength = prefix.length+msgCommand.name.length;
		let msgContext = msg.content.substring(cmdLength).toLowerCase().trim();
		//Check to see if there was a space between msgCommand and msgContext (for Eric joke) <--Need to debug.
		const ericAdd = (msg.content.indexOf(' ') === cmdLength && msg.content.indexOf(' ') !== -1 && msgContext.length!==0) ? 
			'\r *This only works because **Eric** said it should*' : '';

		//Check to see what the command was. If it's an existing command, run that command and report back the result. Otherwise, run a basic help command with no context.
		if(!bot.commands.has(prefix+msgCommand.name)){
			return;
		} else {
			const command = bot.commands.get(prefix+msgCommand.name);
			try {
				msg.reply(' ('+msg.content+')'+ericAdd+'\r'+command.execute(msgContext, msg, prefix));
			} catch (error) {
				console.error(error);
				return msg.channel.send(defResponse(msg.author.toString(), prefix));
			}
		}
	}	
});
