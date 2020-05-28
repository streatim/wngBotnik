const Discord = require('discord.js');
const config = require('./auth.json');
const bot = new Discord.Client();
bot.login(config.token);

//Require all command files.
const roll = require('./commands/roll.js');
const complication = require('./commands/complication.js');
const condition = require('./commands/condition.js');
//const crit = require('./commands/crit.js');
//const injury = require('./commands/injury.js');
//const mutation = require('./commands/mutation.js');
//const objective = require('./commands/objective.js');
//const perils = require('./commands/perils.js');
//const trinket = require('./commands/trinket.js');
//const help = require('./commands/help.js');

//Listen to messages for potential commands.
bot.on('message', msg=> {	
	if(msg.content.startsWith('!wg')){	
		//Gather everything after the ! but excluding any spaces. All commands can be expected to be !{command} {extra info for command}. Will sanitize the context in each function.
		var msgCommand = msg.content.substring(3).split(' ')[0].toLowerCase();
		var msgContext = msg.content.substring(msgCommand.length+4).toLowerCase();
		
		//Check to see what the command was. If it's an existing command, run that command and report back the result. Otherwise, run a basic help command with no context.
		switch (msgCommand){
			case 'roll':
				return msg.channel.send(msg.author+' ('+msg.content+') '+roll(msgContext));		
			case 'complication':
				return msg.channel.send(msg.author+' ('+msg.content+') '+complication(msgContext));
		 	case 'condition':
				return msg.channel.send(msg.author+' ('+msg.content+') '+condition(msgContext));
			case 'crit':
				return msg.channel.send(msg.author+' ('+msg.content+') '+crit());
			//case 'injury':
				//return msg.channel.send(msg.author+' ('+msg.content+') '+roll(msgContext));
			/*case 'mutation':
				return msg.channel.send(msg.author+' ('+msg.content+') '+mutation(msgContext));				
			case 'objective':
				return msg.channel.send(msg.author+' ('+msg.content+') '+objective(msgContext));
			case 'perils':
				return msg.channel.send(msg.author+' ('+msg.content+') '+perils(msgContext));
			case 'trinket':
				return msg.channel.send(msg.author+' ('+msg.content+') '+trinket());
			case 'help':
				return msg.channel.send(msg.author+' ('+msg.content+') '+help(msgContext));
			default:
				return msg.channel.send(msg.author+' ('+msg.content+') '+help());*/		
		}
	}	
});