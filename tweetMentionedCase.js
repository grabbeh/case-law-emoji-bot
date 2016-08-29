const tweet = require('./tweet'),
    getEmojiSummary = require('./getEmojiSummary'),
    async = require('async'),
    _ = require('underscore'),
    request = require('request')

testMentions = [
    { text: "@grabbeh I am impressed! @caselawemoji"},
    { text: "this is the one https://t.co/ywUHRHBu47", id_str: '770241796844691456', user: {screen_name:"grabbeh"}},
    { text: "This tweet does not contain a URL"}
]

//tweet.getMentions(function(err, mentions){
    checkMentions(testMentions, function(err, res){
        if (err)
            console.log(err)
        else   
            console.log(res)
    })
//})

function checkMentions(mentions, fn){
    extractAnyBailiiLinks(mentions, function(err, bailiiMentions){
        async.forEach(bailiiMentions, function(i, callback){
            replyToMention(i, function(err, res){
                if (err){
                    callback();
                }
                else 
                    callback();
            })
        }, function(err){
                if (err)
                    fn(err)
                else   
                    fn(null, "Tweet posted")
            })
        })
}

function extractAnyBailiiLinks(mentions, fn){
        var arr = _.map(mentions, function(i){ return _.pick(i, 'text', 'user', 'id_str'); });
        bailiiMentions = [];
        async.each(arr, function(item, callback){
            returnBailiiLink(item.text, function(err, res){
                if (err)
                    callback();
                else {
                    item.url = res.bailiiLink;
                    bailiiMentions.push(item);
                    callback();
                }
            })
        }, function(err){
            if (err)
                fn(err); 
            else 
                fn(null, bailiiMentions);
        })
}

function replyToMention(mention, fn){
    getEmojiSummary(mention.url, function(err, res){
        if (err){
            fn(err)
        }
        else {
            var content = {};
            var status = "@" + mention.user.screen_name + " " + res.emojiSummary
            var status = status.slice(0, 140)
            content.status = status
            content.in_reply_to_status_id = mention.id_str
            tweet.newTweet(content, function(err, res){
                if (err)
                    fn(new Error(err))
                else   
                    fn(null, res)
            })
        }
    })
}

function returnBailiiLink(text, fn){
    async.auto({
        link: function(cb){
            checkForLink(text, cb)
        },
        expandedLink: ['link', function(results, cb){
            expandLink(results.link, cb);
        }],
        bailiiLink: ['link', 'expandedLink', function(results, cb){
            checkIfBailiiLink(results.expandedLink, cb);
        }]
    }, 
    function(err, results){
        if (err)
        {
            fn(err)
        }
        else 
            fn(null, results);
    })
}

function checkForLink(text, fn){
    if (text.indexOf("http") !== -1){
        var link = text.slice(text.indexOf("http")).split(" ")[0];
        fn(null, link);
    }
    else {
        fn(new Error("No link"));
    }
}

function expandLink(url, fn){
    var urlExpander = "http://urlex.org/json/" + url;
    request(urlExpander, function(err, response, body){
         var obj = JSON.parse(body);
         fn(null, obj[url])
    });
}

function checkIfBailiiLink(url, fn){
    if (url && url.indexOf('bailii') !== -1) {
        fn(null, url);
    }
    else {
        fn(new Error("No link to Bailii"));
    }
}