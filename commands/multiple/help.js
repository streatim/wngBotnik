module.exports = {
    name: 'help',
    description: [
        'Provides a list of all commands, or get info about a specific command'
    ],
    usage: [
        'help {command}'
    ],
    prefix: [
        '!wg',
        '!pf',
    ],
    //The below execute is going to need to be rewritten to work with this bot.
    execute(context, message, prefix){
        const data = [];
        const {commands} = message.client;
        const revisedPrefix = prefix.replace('!', '');
        //Remove the ! from the prefix.


        if(!context.length) {
            const prefixedCommands = Array.from(commands.keys()).filter(cmd => cmd.includes(prefix));
            data.push('Here\'s a list of all commands:');
            data.push(prefixedCommands.join('\r'));
            data.push(`\nYou can use `+prefix+`help {command name} to get info on a specific command!`);       
        } else {
            const name = context.trim();
            const searchName = '!'+name;
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
                data.push(`**Description:**\r ${command.description.join('\r')}`);
            }
            if(command.usage){
                const newUsage = command.usage.map(use => prefix+use);
                data.push(`**Example Syntax:**\r ${newUsage.join('\r')}`);
            }       
        }
        return data.join('\r');   
    },
}