var fs = require("node-fs");
var url = require("url");
var path = require("path");
var Crawler = require("simplecrawler").Crawler;
const util = require('util');

var LOGGER = require("./Logger").getLogger('DownloadSite.js');
var Config = require("./Config");

var execute = function(option, callback) {
  LOGGER.info("Requested domain to fetch >>" + option.domain + " with option :" + JSON.stringify(option));
  LOGGER.info("get CrawlerDirectory >>" + Config.getCrawlerDirectory());

  var myCrawler = new Crawler(option.domain, option.stPoint);
  myCrawler.interval = 250;
  myCrawler.maxConcurrency = 5;

  myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    // Parse url
    var parsed = url.parse(queueItem.url);

    // Rename / to index.html
    if (parsed.pathname === "/") {
      parsed.pathname = "/index.html";
    }

    // Where to save downloaded data
    var outputDirectory = path.join(Config.getCrawlerDirectory(), option.domain);

    // Get directory name in order to create any nested dirs
    var dirname = outputDirectory + parsed.pathname.replace(/\/[^\/]+$/, "");

    // Path to save file
    var filepath = outputDirectory + parsed.pathname;

    // Check if DIR exists
    fs.exists(dirname, function(exists) {
      // If DIR exists, write file
      if (exists) {
        fs.writeFile(filepath, responseBuffer, function() {});
      } else {
        // Else, recursively create dir using node-fs, then write file
        fs.mkdir(dirname, 0755, true, function() {
          fs.writeFile(filepath, responseBuffer, function() {});
        });
      }
    });

    LOGGER.info(util.format("I just received %s (%s bytes)", queueItem.url, responseBuffer.length));
    LOGGER.info(util.format("It was a resource of type %s", response.headers["content-type"]));

  });

  // Fire callback
  myCrawler.on("complete", function() {
    callback();
  });

  // Start Crawl
  myCrawler.start();

};

module.exports = {
  execute: execute
}
