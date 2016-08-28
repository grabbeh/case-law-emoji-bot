var request = require("request"),
    cheerio = require("cheerio");

module.exports = function(url, fn){
    request(url, function(err, response, body){
        var $ = cheerio.load(body);
        caseText = $('body').find('p').map(function(index, el){
            return $(this).text();
        }).get().join(' ');
        if (err)
            fn(err);
        else
            fn(null, caseText);
    })
};