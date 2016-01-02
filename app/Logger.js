const chalk = require('chalk');

var debug = function(inputData, option) {
  if (typeof inputData == 'object') {
    console.log(chalk.red.bold(JSON.stringify(inputData)));
    return;
  }
  console.log(chalk.red.bold(inputData));
}

module.exports = {
  debug: debug
}
