var argv = require('yargs').argv;

var LOGGER = require("./Logger").getLogger('App.js');

var cmdName = argv._[0];
var cmdParams = argv;

LOGGER.info("Command Name : " + cmdName);
LOGGER.info("Command Params : " + JSON.stringify(cmdParams));

var DownloadSite_Cmd = require("./DownloadSite");

DownloadSite_Cmd.execute(cmdParams, function() {
  LOGGER.info("*******************Done!************************");
  LOGGER.info("Command Name : " + cmdName);
  LOGGER.info("Command Params : " + JSON.stringify(cmdParams));
  LOGGER.info("*****************************************************");
});
