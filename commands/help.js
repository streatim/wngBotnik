module.exports = {
    name: 'wghelp',
    description: 'List all of the Wraith and Glory commands, or get info about a specific command',
    //The below execute is going to need to be rewritten to work with this bot.
    execute(context, message){
        const data = [];
        const {commands} = message.client;

        if(!context.length) {
            data.push('Here\'s a list of all the Wraith and Glory commands:');
            data.push(commands.map(command => command.name).join('\r'));
            data.push(`\nYou can use !wghelp [command name]\` to get info on a specific command!`);     
            /*     
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });   
            */    
        } else {
            const name = context.trim();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            
            if (!command) {
                return 'That\'s not a valid command!';
            }
            
            data.push(`**Name:** ${command.name}`);
            
            if(command.aliases){
                data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            }
            if(command.description){
                data.push(`**Description:**\r ${command.description.join('\r')}`);
            }
            if(command.usage){
                data.push(`**Example Syntax:**\r ${command.usage.join('\r')}`);
            }
            return data.join('\r');          
        }
    },
}