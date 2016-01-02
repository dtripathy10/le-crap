var page = require('webpage').create();
page.open('http://github.com/', function() {
  page.render('image/' + 'github.png');
  phantom.exit();
});