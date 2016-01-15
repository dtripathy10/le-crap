var fs = require('fs');
var x = require('casper').selectXPath;
var CasperUtil = require("../CasperUtil");

casper.test.begin('FedEx Scrapper', 1, function(test) {

  casper.options.viewportSize = {
    width: 1600,
    height: 1000
  };

  casper.start('http://www.fedex.com/locate/index.html?cc=us#start', function() {
    this.echo(this.getTitle(), 'INFO');
  });

  casper.wait(4500, function() {
    casper.then(function() {
      this.capture('data/FedEx/fedex-beore-1.png');
      fs.write("data/" + 'FedEx/fedex-index-1.html', CasperUtil.getHtmlContent(this), 'w');
    });
  });

  casper.wait(4500, function() {
    casper.then(function() {
      this.sendKeys(x('//*[@id="geoAutoComplete"]/fieldset/input[1]'), 'usa');
      this.click(x('//*[@id="geoAutoComplete"]/fieldset/input[2]'));
    });
  });

  casper.wait(5500, function() {
    casper.then(function() {
      this.capture('data/FedEx/fedex-after-1.png');
      var lItems = this.evaluate(function() {
        var _lItems = document.getElementsByTagName("li");
        return _lItems;
      })
      for (var i = 0; i < lItems.length; i++) {
        this.echo(lItems[i].innerHTML, 'INFO');
      }

    });
  });

  casper.run(function() {
    console.log("Enter........");
    test.done();
  });
});
