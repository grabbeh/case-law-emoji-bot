
const baseUrl = require("./baseUrl"),
    provideCaseUrl = require("./provideCaseUrl"),
    getCase = require("./getCase"),
    summariseCase = require("./summariseCase"),
    emojifySummary = require("./emojifySummary"),
    async = require("async"),
    _ = require('underscore'),
    cfg = require('./config/config'),
    Twitter = require("twitter"),
    client = new Twitter({
        consumer_key: cfg.consumerkey,
        consumer_secret: cfg.consumerSecret,
        access_token_key: cfg.accessKey,
        access_token_secret: cfg.accessSecret   
    });

provideCaseUrl(baseUrl(), function(err, url){
    getEmojiSummary(url, function(err, results){
        postTweet(url, results.emojiSummary, function(err, res){
            if (err)    
                console.log(err);
            else        
                console.log("Tweet posted");
        })
    });
})

function postTweet(url, content, fn){
    var status = url + " " + content;
    var status = status.slice(0, 140);
    client.post('statuses/update', {status: status},  function(err, tweet, response) {
        if (err)
            fn(err)
        else
            fn(null, response);
        });
}

// Takes URL from Bailii.org and returns emoji summary
function getEmojiSummary(url, fn){
    async.auto({
        caseDetails: [function(cb){
            getCase(url, cb);
        }],
        caseSummary: ['caseDetails', function(results, cb){
            summariseCase(results.caseDetails, cb);
        }],
        emojiSummary: ['caseDetails', 'caseSummary', function(results, cb){
            emojifySummary(results.caseSummary, cb);
        }]
        }, 
    function(err, results){
        if (err)
            fn(err);
        else
            fn(null, results);
    })
}

