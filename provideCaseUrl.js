var cheerio = require("cheerio"),
    _ = require("underscore"),
    request = require("request");

module.exports = function(url, fn){
    request(url, function(err, response, body){
        var $ = cheerio.load(body);
        var urlArray = $('ul').find('li').find('a').map(function(index, el){
            return $(this).attr('href');
        });
        var caseUrl = "http://www.bailii.org" + _.sample(_.values(urlArray));
        if (err)
            fn(err);
        else 
            fn(null, caseUrl);
    })
} 