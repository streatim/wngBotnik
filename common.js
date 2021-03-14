const defResponse = require('./defResponse.js');
const common = {
  dice(potential) {
    //Mimics a dice roll with a die the size of "potential."
    output = Math.ceil(Math.random() * potential);
    return output;
  },

  intValCheck(value, def){
    output = (isNaN(parseInt(value))) ? def : parseInt(value);
    return output;
  },

  buildlist(context, listArray){
    //This function lists values from listArray with the contextual statement before it. Often used in HELP descriptions.
    //First find the largest value in listArray in order to set the size of the columns.
    let output = [];
    let max = 0;
    listArray.map(v => max = Math.max(max, v.length));
    max += 5;

    //Now add the contextual statement and list out the objects.
    output.push(context);
    output.push('```');
    const whiteSpace = ' ';
    let cmdOutput = '';
    for(i=0;i<listArray.length;i++){
        cmdOutput += listArray[i];
        if(i%2 !== 0){cmdOutput += '\n';}else{
            cmdOutput+=whiteSpace.repeat(max-listArray[i].length);
        }
    }
    output.push(cmdOutput);
    output.push('```');
    return output.join('\n');
  },

  badCall(prefix) {
    return {
      files: [{
        attachment: './img/magicWord.gif',
        name: 'magicWord.gif'
      }],
      content: defResponse(prefix),
    };
  }
};

module.exports = common;