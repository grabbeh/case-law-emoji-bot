var got = require("got"),
    _ = require("underscore"),
    async = require("async")

module.exports = function(summary, fn){
    var emojis = []
    async.forEach(summary, function(item, callback){
        got('emoji.getdango.com/api/emoji', {
            json: true,
            query: {
                q: item
            }
        }).then(function(res){
            res.body.results.map(function(x){
                if (x.score > 0){
                    emojis.push(x.text);
                }
                callback()
            })   
        });
    },  function(err){
        if (err)
            fn(err)
        else {
            var uniqEmojis = _.uniq(emojis)
            fn(null, uniqEmojis.join(" "))
        }
    })
}