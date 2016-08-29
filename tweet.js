const cfg = require('./config/config'),
    Twitter = require("twitter"),
    client = new Twitter({
        consumer_key: cfg.consumerkey,
        consumer_secret: cfg.consumerSecret,
        access_token_key: cfg.accessKey,
        access_token_secret: cfg.accessSecret   
    });

exports.newTweet = function(content, fn){
    console.log(content)
    client.post('statuses/update', content,  function(err, tweet, response) {
        if (err)
            fn(err)
        else
            fn(null, response)
        });
}

exports.getMentions = function(fn){
    client.get('statuses/mentions_timeline', function(err, mentions, response) {
        if (err){
            fn(err)
        }
        else (!err)
            fn(null, mentions)
    })
}

exports.getTweet = function(id, fn){
    client.get('statuses/show/' + id, {}, function(err, tweet, response){
        if (err)
            fn(err)
        else    
            fn(null, tweet);
    })
}