const common = require('../../common.js');

const pfroll = function pfroll(context){
    //Context can be 1 of 5 things: XdY+Z; XdY-Z; XdY; dY; Y
    let normalizedContext = context.toLowerCase();
    let x = 1;
    let y = 20;
    let z = 0;
    let addsub = 'Adding';
    if(normalizedContext.includes('+')){
        let newContext = normalizedContext.split('+');
        z = common.intValCheck(newContext[1], z);
        normalizedContext = newContext[0]; 
    }
    if(normalizedContext.includes('-')){
        let newContext = normalizedContext.split('-');
        z = common.intValCheck(newContext[1], z);
        normalizedContext = newContext[0];
        addsub = 'Subtracting';
    }

    if(normalizedContext.includes('d')){
        let newContext = normalizedContext.split('d');
        x = common.intValCheck(newContext[0], x);
        y = common.intValCheck(newContext[1], y);
    } else {y = common.intValCheck(normalizedContext, y);}

    const rollList = [];
    let totalRoll = 0;
    if(addsub === 'Adding'){
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

    const output = [
        'Rolling '+x+' d'+y+plural+'.',
        'You rolled: *'+rollList.join(', ')+'*',
        addsub+': '+z,
        'for a total of: **'+totalRoll+'**'
    ];

    return output.join('\r');
}

module.exports = pfroll;