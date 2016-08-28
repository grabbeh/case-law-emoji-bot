
const baseUrl = require("./baseUrl"),
    provideCaseUrl = require("./provideCaseUrl"),
    getCase = require("./getCase"),
    summariseCase = require("./summariseCase"),
    emojifySummary = require("./emojifySummary"),
    cfg = require('./config/config'),
    async = require("async"),
    Twitter = require("twitter"),
    _ = require('underscore'),
    client = new Twitter({
        consumer_key: cfg.consumerkey,
        consumer_secret: cfg.consumerSecret,
        access_token_key: cfg.accessKey,
        access_token_secret: cfg.accessSecret   
    });

getEmojiSummary(function(err, results){
    if (err)
        console.log(err);
    var status = results.caseUrl + " " + results.emojiSummary;
    var status = status.slice(0, 140);
    client.post('statuses/update', {status: status},  function(err, tweet, response) {
        if (err)    
            console.log(err);
        else        
            console.log("Tweet posted");
    });
});

function getEmojiSummary(fn){
    async.auto({
        caseUrl: function(cb){
            provideCaseUrl(baseUrl(), cb);
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
                    fn(err);
                else
                    fn(null, results);
        })
}

