
const baseUrl = require("./baseUrl"),
    getEmojiSummary = require("./getEmojiSummary"),
    provideCaseUrl = require("./provideCaseUrl"),
    tweet = require('./tweet')

module.exports = function(){
    provideCaseUrl(baseUrl(), function(err, url){
        getEmojiSummary(url, function(err, res){
            var content = {}
            status = url + " " + res.emojiSummary
            status.slice(0, 140)
            content.status = status
            tweet.newTweet(content, function(err, res){
                if (err)    
                    console.log(err)
                else        
                    console.log("Tweet posted")
            })
        })
    })
}

