var soda = require('soda')
    , assert = require('assert');

var browser = soda.createClient({
    host: 'localhost', port: 4444, url: 'http://www.google.com', browser: 'chrome'
});

browser
    .chain
    .session()
    .open('/')
    .type('//input[@id="gbqfq"]', 'Hello World')
    .clickAndWait('btnG')
    .getTitle(function (title) {
        assert.equal(~title.indexOf('Hello World'), 0)
    })
    .end(function (err) {
        browser.testComplete(function () {
            console.log('done');
            if (err) throw err;
        });
    });
