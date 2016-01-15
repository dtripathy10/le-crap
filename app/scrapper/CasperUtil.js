function getHtmlContent(casperPageInstance) {
  var js = casperPageInstance.evaluate(function() {
    return document;
  });
  var htmlPage = js.all[0].outerHTML;
  return htmlPage;
}

function writeToFile(fileName, content) {
  //
}

module.exports = {
  getHtmlContent: getHtmlContent
}
