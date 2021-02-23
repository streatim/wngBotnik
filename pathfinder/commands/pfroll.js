const common = require('../../common.js');

const pfroll = function pfroll(context){
    //Context can be 1 of 5 things: XdY+Z; XdY-Z; XdY; dY; Y
    //These five things can be repeated by using an ampersand.
    let normalizedContext = context.toLowerCase();
    let rollCommands = [];
    //Set a rollCommands array that will be looped. This allows for multiple dice roll commands to be combined.
    if(normalizedContext.includes('&')){
        rollCommands = normalizedContext.split('&').map(userInput => userInput.trim());
    } else {
        rollCommands.push(normalizedContext.trim());
    }
    const rollList = [];
    const output = [];
    for(i=0;i<rollCommands.length;i++){
        let userInput = rollCommands[i];
        //Set default values
        let x = 1; //Default number of dice of type 'y' rolled.
        let y = 20; //Default size of die 'y' (d20 = 20)
        let z = 0; //Default number to be added or subtracted.
        let addsub = 'add'; //Default operation; in this case, we generally assume you're always adding values.

        if(userInput.includes('+')){
            let newContext = userInput.split('+');
            z = common.intValCheck(newContext[1], z);
            userInput = newContext[0]; 
            addsub = 'add'; 
        }
        if(userInput.includes('-')){
            let newContext = userInput.split('-');
            z = common.intValCheck(newContext[1], z);
            userInput = newContext[0];
            addsub = 'sub';
        }
    
        if(userInput.includes('d')){
            let newContext = userInput.split('d');
            x = common.intValCheck(newContext[0], x);
            y = common.intValCheck(newContext[1], y);
        } else {y = common.intValCheck(userInput, y);}
    
        let totalRoll = 0;
        if(addsub === 'add'){
            totalRoll = totalRoll+z;
        } else {
            totalRoll = totalRoll-z;
        }
    
        for(i=0;i<x;i++){
            let result = common.dice(y);
            rollList.push(result);
            totalRoll += result;
        }
    
        const plural = (x>1) ? 's':'';
    
        output.push([
            'Rolling '+x+' d'+y+plural+'.',
            'You rolled: *'+rollList.join(', ')+'*',
            addsub+': '+z,
            'for a total of: **'+totalRoll+'**'
        ].join('\r'));        

    }
    return output.join('\r');
}

module.exports = pfroll;