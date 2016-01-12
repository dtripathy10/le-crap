casper.test.begin('Search Keyword using Google', 1, function(test) {

  casper.start('https://www.google.co.in/', function() {
    this.echo(this.getTitle(), 'INFO');
  });

  casper.then(function() {
    this.fill('form[action="/search"]', {
      q: "Debabrata Tripathy"
    }, true);
  });

  casper.wait(500, function() {
    casper.then(function() {
      var js = this.evaluate(function() {
        return document;
      });
      //this.echo(JSON.stringify(js));
      this.capture('google-search.png');
    });
  });

  casper.run(function() {
    console.log("Enter........");
    test.done();
  });
});
