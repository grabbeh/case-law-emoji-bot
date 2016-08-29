
const baseUrl = require("./baseUrl"),
    getEmojiSummary = require("./getEmojiSummary"),
    provideCaseUrl = require("./provideCaseUrl"),
    tweet = require('./postTweet')

provideCaseUrl(baseUrl(), function(err, url){
    getEmojiSummary(url, function(err, res){
        var content = url + " " + res.emojiSummary;
        var content = content.slice(0, 140);
        tweet.newTweet(content, function(err, res){
            if (err)    
                console.log(err);
            else        
                console.log("Tweet posted");
        })
    });
})





