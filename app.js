
const request = require("request"),
    got = require('got'),
    config = require('./config/config'),
    async = require("async"),
    cheerio = require("cheerio"),
    emoji = require("node-emoji"),
    isEmoji = require('is-emoji-keyword'),
    Twitter = require("twitter"),
    _ = require('underscore'),
    summarise = require("nodejs-text-summarizer"),
    client = new Twitter({
        consumer_key: config.consumerkey,
        consumer_secret: config.consumerSecret,
        access_token_key: config.accessKey,
        access_token_secret: config.accessSecret   
    })
    
var num = _.random(0, 550).toString();
if (num.length === 1) 
  num = "000" + num;
if (num.length === 2)
  num = "00" + num;
if (num.length === 3)
  num = "0" + num;
  
var BailiiUrl = "http://www.bailii.org/indices/all-cases-" + num + ".html";

async.auto({
    caseUrl: function(cb){
        provideCaseUrl(BailiiUrl, cb);
    },
    caseDetails: ['caseUrl', function(results, cb){
        getCase(results.caseUrl, cb);
    }],
    caseSummary: ['caseUrl', 'caseDetails', function(results, cb){
        summariseCase(results.caseDetails, cb);
    }],
    emojiSummary: ['caseUrl', 'caseDetails', 'caseSummary', function(results, cb){
        emojifySummary(results.caseSummary, cb);
    }]
    }, function(err, results){
        if (err)
            console.log(err);
        var status = results.caseUrl + " " + results.emojiSummary;
        var status = status.slice(0, 140);
        client.post('statuses/update', {status: status},  function(err, tweet, response) {
            if (err)    
                console.log(err);
            else        
                console.log(response);
        });
    })

function provideCaseUrl(url, fn){
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

function getCase(url, fn){
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
}

function summariseCase(text, fn){
    var summary = summarise(text).split(' ');
    fn(null, _.without(summary, "BAILII", " "));
}

function emojifySummary(summary, fn){
    var emojis = [];
    async.forEach(summary, function(item, callback){
        got('emoji.getdango.com/api/emoji', {
            json: true,
            query: {
                q: item
            }
        }).then(function(res){
            res.body.results.map(function(x){
                emojis.push(x.text);
                callback();
            })   
        });
    },  function(err){
        if (err)
            fn(err);
        else
            fn(null, emojis.join(" "));
    });
};
