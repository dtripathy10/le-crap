var argv = require('yargs').argv;
const util = require('util');

var LOGGER = require("./Logger").getLogger('App.js');

var cmdName = argv._[0];
var cmdParams = argv;

LOGGER.info("Command Name : " + cmdName);
LOGGER.info("Command Params : " + JSON.stringify(cmdParams));



function executeDownloadSite() {
  var DownloadSite_Cmd = require("./DownloadSite");
  DownloadSite_Cmd.execute(cmdParams, function() {
    LOGGER.info("*******************Done!************************");
    LOGGER.info("Command Name : " + cmdName);
    LOGGER.info("Command Params : " + JSON.stringify(cmdParams));
    LOGGER.info("*****************************************************");
  });
}

function executeAnalyzePage() {
  var AnalyzePage_Cmd = require('./AnalyzePage');
  AnalyzePage_Cmd.execute(cmdParams, function(resUrls) {
    LOGGER.info("*******************Done!************************");
    LOGGER.info("Command Name : " + cmdName);
    LOGGER.info("Command Params : " + JSON.stringify(cmdParams));
    LOGGER.info(util.inspect(resUrls));
    LOGGER.info("*****************************************************");
  });
}

switch (cmdName) {
  case 'DownloadSite':
    executeDownloadSite();
    break;
  case 'AnalyzePage':
    executeAnalyzePage();
    break;
}
