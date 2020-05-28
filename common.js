const common = {
  dice(potential) {
    output = Math.ceil(Math.random() * potential);
    return output;
  },
};

module.exports = common;