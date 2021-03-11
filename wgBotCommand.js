//Set up required packages and files.
const Discord = require('discord.js');
const {superPrefix, prefixes, token} = require('./auth.json');
const fs = require('fs');
const {badCall} = require('./common.js');

//Authenticate into the Discord Client.
const bot = new Discord.Client();
bot.login(token);
console.log('New log Test');
//Dynamically require all command files.
bot.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	if(prefixes.find(p => p==folder)||['universal', 'multi'].includes(folder)){
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles){
			const command = require(`./commands/${folder}/${file}`);
			//Make sure the command isn't getting debugged.
			if(!command.debug){
				//Now to assign prefixes. 
				//${folder} is the determiner and, potentially, the other prefix. If something is in the wg folder, it is automatically affixed with the !wg prefix. If something is in the universal folder, it is affixed with all prefixes. If something is in a multi folder, check command.prefix for a list of prefixes it applies to.
				if(folder === 'universal'){
					command.prefix = prefixes;
				} else if(folder !== 'multi'){
					command.prefix = [folder];
				}
				for(const prefixes of command.prefix){
					bot.commands.set(superPrefix+prefixes+command.name, command);
				}
			}
		}
	}
}

//Listen to messages for potential commands.
bot.on('message', async msg=> {
	const prefixCommand = prefixes.find(p => msg.content.startsWith(superPrefix+p));
	if(prefixCommand){
		const prefix = superPrefix+prefixCommand;
		//An expected prefix has been found! Now to find a command.
		let msgCommand = bot.commands.find(cmd => msg.content.startsWith(prefix+cmd.name));
		if(!msgCommand){return msg.reply(badCall(prefix));}
		let cmdLength = prefix.length+msgCommand.name.length;
		let msgContext = msg.content.substring(cmdLength).toLowerCase().trim();
		//Check to see if there was a space between msgCommand and msgContext (for Eric joke)
		const ericAdd = (msg.content.indexOf(' ') !== cmdLength && msgContext.length!==0) ? 
			'\r *This only works because **Eric** said it should*' : '';

		//Check to see what the command was. If it's an existing command, run that command and report back the result. Otherwise, insult them (and log it).
		if(!bot.commands.has(prefix+msgCommand.name)){
			msg.reply(badCall(prefix));
		} else {
			const command = bot.commands.get(prefix+msgCommand.name);
			try {
				let response = await command.execute(msgContext, prefix, msg);
				//Sometimes, especially if the command is bad, it's returning with an object rather than a string. msg.reply works differently depending on what's what, so we just need to make sure it's a string rather than an object.
				if(typeof response === 'string'){
					msg.reply(' ('+msg.content+')'+ericAdd+'\r'+response);
				} else {
					msg.reply(response);
				}
			} catch (error) {
				console.error(error);
				return msg.reply(badCall(prefix));
			}
		}
	}	
});
