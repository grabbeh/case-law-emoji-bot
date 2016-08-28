let request = require("request"),
    config = require('./config'),
    async = require("async"),
    cheerio = require("cheerio"),
    emoji = require("node-emoji"),
    twitter = require("twitter"),
    _ = require('underscore'),
    summariser = require("nodejs-text-summariser"),
    client = new twitter({
        consumer_key: config.consumerkey,
        consumer_secret: config.consumerSecret,
        access_token_key: config.accessKey,
        access_token_secret: config.accessSecret   
    })
    
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
        summariseCase(results[1], cb);
    }],
    emojifySummary: ['provideCaseUrl', 'getCase', 'summariseCaseUrl', function(cb, results){
        emojifySummary(results[2], cb);
    }, function(err, results){
        client.post('statuses/update', {status: results[3]},  function(error, tweet, response) {
        });
    })
})


function provideCaseUrl(BailiiUrl, fn){
    request(BailiiUrl, function(error, response, body){
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            var caseUrl = _.sample(_.map($('ul').nextAll(), function(url){url = url.data('href'); return url;}));
            fn(null, caseUrl);
        }
    })
} 

function getCase(caseUrl, fn){
    request(caseUrl, function(error, response, body){
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            case = $('ol').nextAll;
            fn(null, case);
        }
    })
}

function summariseCase(case, fn){
    return fn(null, summariser(case));
}

function emojifySummary(summary, fn){
    let caseArray = summary.split(' ');
    let emojis = [];
    _.each(caseArray, function(item){
        let em = emoji.which(emoji.get(item));
        emojis.push(em);
    })
    fn(null, emoji.emojify(emojis.join(" ")));
}

function postTweet(content, fn){
    client.post('statuses/update', {status: content},  function(error, tweet, response) {
    });
}
