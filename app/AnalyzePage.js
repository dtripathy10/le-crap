var cheerio = require('cheerio');
var request = require('superagent');
var fs = require('fs');
const util = require('util');

var LOGGER = require("./Logger").getLogger('AnalyzePage.js');


function getUrlsFromPattern(option, cb) {
  LOGGER.info("Requested url to fetch >>" + option.url + " with option :" + JSON.stringify(option));
  var resUrls = [];
  request
    .get(option.url)
    .end(function(err, res) {
      var html = res.text;
      LOGGER.debug(html);
      if (!err) {
        var $ = cheerio.load(html);
        $(option.selector).filter(function() {
          var data = $(this).attr('href')
          resUrls.push(data);
        });
        cb(resUrls);
      }
    });
}

module.exports = {
  execute: getUrlsFromPattern
}
