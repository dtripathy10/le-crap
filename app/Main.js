var cheerio = require('cheerio');
var request = require('superagent');
var fs = require('fs');

var LOG = require('./Logger');

var url = 'http://www.imdb.com/title/tt1229340/';

request
  .get(url)
  .end(function(err, res) {
    var html = res.text;
    var url_alias = 'http://www.imdb.com/title/tt1229340/';
    var pattern = /[\/]+/g;
    url_alias = url_alias.replace(pattern, function replacer(match) {
        return '-';
      });
    console.log(url_alias);
    fs.writeFile(__dirname + '/data/' + url_alias + '.json', JSON.stringify(res), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    if (!err) {
      var $ = cheerio.load(html);
      var title, release, rating;
      var json = {
        title: "",
        release: "",
        rating: ""
      };
      $('.header').filter(function() {
        var data = $(this);
        title = data.children().first().text();
        release = data.children().last().children().text();
        json.title = title;
        json.release = release;
      });
      $('.star-box-giga-star').filter(function() {
        var data = $(this);
        rating = data.text();
        json.rating = rating;
      });
      LOG.debug(json);
    }
  });
