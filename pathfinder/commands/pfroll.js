const common = require('../../common.js');
const operators = {
    '+': function(a, b) {return a + b },
    '-': function(a, b) {return a - b },
    '*': function(a, b) {return a * b },
    '/': function(a, b) {return Math.floor(a/b)}
};
const operatorOptions = ['+', '-', '*', '/'];

const indRoll = function indRoll(context){
    //Set default values for rolls. We can expect that this follows one of two formats: dY or XdY
    let x = 1; //Default number of dice of type 'y' rolled.
    let y = 20; //Default size of die 'y' (d20 = 20)
    let indRollTotal = 0;
    const rollList = [];

    let newContext = context.split('d');
    x = common.intValCheck(newContext[0], x);
    y = common.intValCheck(newContext[1], y);
    const plural = (x>1) ? 's':'';

    for(g=0;g<x;g++){
        let result = common.dice(y);
        rollList.push(result);
        indRollTotal += result;
    }

    return {
        roll: x+'d'+y,
        plural: plural,
        rollList: '('+rollList.join(' + ')+' = '+indRollTotal+')',
        indRollTotal: indRollTotal
    };
}

const pfroll = function pfroll(context){
    /*
    Context is the complete string typed by the user. This string can contain a number of different "roll commands."
    The roll commands can be multiple things, including XdY; XdY; dY; +Z; -Z; Z
    There are four types of conjunctions that can be used; an ampersand (&), a comma (,), and addition/subtraction (+/-) commands.
    Ampersands and Commas combine different rolls into a single command; in other words, the following lines are virtually identical:
    !pfroll 1d20,d10
    !pfroll 1d20&d10
    !pfroll 1d20 ; !pfroll d10
    Addition/Subraction commands combine roll commands into a single result; in other words, rather than 1d20,d10 where each creates two results, 1d20+d10 creates a single result.
    Within the context of Pathfinder, !pfroll 1d20&d10 would be like rolling your attack and damage rolls simultaneously, while !pfroll d10+d6 would be like rolling a damage roll with an additional sneak attack die.
    */
    //Set array variables that will be used later in the function.
    const output = [];

    //Set everything to lowercase.
    let normalizedContext = context.toLowerCase();

    //rollCommands is an empty array that will include every roll command joined by commas or ampersands (or just a single command)
    let rollCommands = normalizedContext.split(/\s*(?:,|&)\s*/).map(userInput => userInput.trim());

    //rollCommands is now an array of different roll commands. Loop through them and start to put together the output strings.
    for(i=0;i<rollCommands.length;i++){
        if(rollCommands[i] === ''){continue;}  
        //Split the roll by additions and subtractions. We need to keep them in the output because we need to know if we're adding or subtracting things.
        let rollCombos = rollCommands[i].split(/\s*(\+|\-|\\|\*)\s*/).map(userInput => userInput.trim());
        
        //Set the default values for all of the commands.
        let op = '+'; //Default operator - addition.
        let totalRoll = 0; //Starting total.
        let totalAlter = 0 //Default number to alter the totalRoll (this changes with each rollCombo command)
        let modifyString = ''; //Start of the modifyString.
        const diceStrings = [];
        const rollResultStrings = [];
        const rollStrings = [];
        
        for(j=0;j<rollCombos.length;j++){
            if(rollCombos[j] === ''){continue;}
            //rollCombo could be 1d20, d20, 1, + or -
            //A dice roll will always have a 'd' in it
            if(rollCombos[j].includes('d')){
                //This is a dice roll to be parsed.
                let result = indRoll(rollCombos[j]);

                //Add the rolls to the diceStrings, rollResultsStrings, and totalAlter.
                totalAlter = result.indRollTotal;
                diceStrings.push(result.roll + result.plural);
                rollResultStrings.push(op+' '+result.indRollTotal+' - '+result.roll+result.plural+': *('+result.rollList+')*');
            } else if(operatorOptions.includes(rollCombos[j])) {
                //It's an operator.
                op = rollCombos[j];
                continue;
            } else {
                //At this point, this *should* be just a number to be added or subtracted from the values. If it isn't an integer, make it 0.
                totalAlter = common.intValCheck(rollCombos[j], 0);
                rollResultStrings.push(op+' '+totalAlter)
                //modifyString += op+totalAlter;
            }      
            totalRoll = operators[op](totalRoll, totalAlter);
        }
        let diceString = (diceStrings.length>0) ? diceStrings.join(' and ')+'.' : 'no dice.';
        rollResultString = rollResultStrings.join('\r');

        rollStrings.push(diceString);
        if(rollResultString !== ''){
            rollStrings.push(rollResultString);
        }
        if(modifyString !== ''){rollStrings.push(modifyString);}
        rollStrings.push('for a total of: **'+totalRoll+'**');

        output.push(rollStrings.join('\r'));
    }
    //Add "Rolling " to the start of the first result in output. If there's only a single result, that's fine!
    output[0] = 'Rolling '+output[0];

    //If there are more than one result in output, then add two line breaks and "Then you rolled "
    return output.join('\r\rThen you rolled ');
}

module.exports = pfroll;