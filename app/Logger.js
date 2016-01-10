const chalk = require('chalk');
const util = require('util');


function getLogger(fileName, option) {

  var respObj = {};

  respObj.debug = function(inputData, option) {
    var debugMsg = chalk.red.bold(fileName) + "\t";
    debugMsg += chalk.yellow(util.format(inputData));
    console.log(debugMsg);
  }

  respObj.info = function(inputData, option) {
    var infoMsg = chalk.blue.bold(fileName) + "\t";
    infoMsg += chalk.red(util.format(inputData));
    console.log(infoMsg);
  }
  return respObj;
}

module.exports = {
  getLogger: getLogger
}
