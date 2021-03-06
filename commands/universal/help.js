const {superPrefix} = require('./../../auth.json');
const {buildlist} = require('./../../common.js');

module.exports = {
    name: 'help',
    description: [
        'Provides a list of all commands, or get info about a specific command'
    ],
    usage: [
        'help {command}'
    ],
    //The below execute is going to need to be rewritten to work with this bot.
    execute(context, prefix, message){
        const data = [];
        const {commands} = message.client;
        const revisedPrefix = prefix.replace(superPrefix, '');
        //Remove the ! from the prefix.
        if(!context.length) {
            //Only include commands that use this prefix.
            const prefixedCommands = Array.from(commands.keys()).filter(cmd => cmd.includes(prefix));
            data.push(buildlist('Here\'s a list of all commands:', prefixedCommands));
            data.push(`You can use `+prefix+`help {command name} to get info on a specific command!`);       
        } else {
            const name = context.trim();
            const searchName = superPrefix+name;
            const command = commands.get(searchName) || commands.find(c => c.aliases && c.aliases.includes(searchName));

            if (!command) {
                //The command does not exist.
                return `${name} is not a valid command!`;
            }
            
            data.push(`**Name:** ${revisedPrefix}${command.name}`);
            if(command.aliases){ //Not used, but we could!
                data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            }
            if(command.description){
                data.push(`**Description:**\n${command.description.join('\n')}`);
            }
            if(command.usage){
                const newUsage = command.usage.map(use => prefix+use);
                data.push(`**Example Syntax:**\n${newUsage.join('\n')}`);
            }       
        }
        return data.join('\n');   
    },
}