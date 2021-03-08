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