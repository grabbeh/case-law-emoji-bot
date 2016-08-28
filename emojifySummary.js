var got = require("got"),
    async = require("async");

module.exports = function(summary, fn){
    var emojis = [];
    async.forEach(summary, function(item, callback){
        got('emoji.getdango.com/api/emoji', {
            json: true,
            query: {
                q: item
            }
        }).then(function(res){
            res.body.results.map(function(x){
                if (x.score > 0.05)
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