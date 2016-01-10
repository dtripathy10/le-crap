# le-crap

Web scrapper on nodejs platform

##### Crawling a Site

```bash
node app/App.js DownloadSite --domain="www.civil.iitb.ac.in" --stPoint="/~gpatil"
```

##### Find Pattern

```bash
node app/App.js AnalyzePage --url="https://www.etsy.com/search?q=knit" --selector=".btn.btn-secondary.btn-group-item.btn-icon"
```