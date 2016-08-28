let request = require("request"),
    async = require("async"),
    cheerio = require("cheerio"),
    twitter = require("twitter"),
    _ = require('underscore'),
    text-summary = require("nodejs-text-summariser");
    
let number = _.random(0, 550).toString();

if (number.length === 1) 
  number = "000" + number;
  
if (number.length === 2)
  number = "00" + number;
  
if (number.length === 3)
  number = "0" + number;
  
let BailiiUrl = "http://www.bailii.org/indices/all-cases-" + number + ".html";

async.auto({
    provideCaseUrl: function(cb, results){
        provideCaseUrl(BailiiUrl, cb)
    },
    getCase: ['provideCaseUrl', function(cb, results){
        getCase(results[0], cb);
    }],
    summariseCase: ['provideCaseUrl', 'getCase', function(cb, results){
    
    
    }],
    emojifySummary: ['provideCaseUrl', 'getCase', 'summariseCaseUrl', function(cb, results){
    
    
    
    
    }, function(err, results){
    
    
    })
})


function provideCaseUrl(BailiiUrl, fn){
    request(BailiiUrl, function(error, response, body){
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            var caseUrl = _.sample(_.map($('ul').nextAll(), function(url){url = url.data('href'); return url;}));
            return fn(null, caseUrl);
        }
    })
} 

function getCase(caseUrl, fn){
    request(caseUrl, function(error, response, body){
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            case = $('ol').nextAll;
            return fn(null, case);
        
        }
        
    })
}

function summariseCase


