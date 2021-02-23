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

  badCall(type) {
    //Return a "bad call" message that lets the person know they used the command !wg(type) wrong.
    return 'Please see !wghelp '+type+' for instructions on how to use the !wg'+type+' command.';
  }
};

module.exports = common;