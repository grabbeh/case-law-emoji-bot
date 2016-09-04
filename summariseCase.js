var key = require("./config/watson"),
    _ = require("underscore"),
    async = require('async'),
    tool = require('node-summary')
    watson = require('watson-developer-cloud'),
    alchemy_language = watson.alchemy_language({api_key: key})

var parameters = {
  extract: 'concepts, keywords',
  sentiment: 1,
  maxRetrieve: 1,
  
}

module.exports = function(text, fn){
    async.auto({
        ibm: function(cb){
            ibm(text, cb)
        },
        naive: function(cb){
            naive(text, cb)
        }
    }, function(err, results){
        console.log(results)
         if (err)
             console.log(err)
         else {
             console.log(_.union(results.ibm, results.naive))
             fn(null, _.union(results.ibm, results.naive))
         }
         
    })
}

function ibm(text, fn){
    parameters.text = text
        alchemy_language.combined(parameters, function (err, res) {
            if (err)
                fn(err)
            else {
                var keywords = _.map(res.keywords, function(i){ return i.text })
                var concepts = _.map(res.concepts, function(i){ return i.text})
                fn(null, _.union(keywords, concepts))
            }
        })
}

function naive(text, fn){
    tool.summarize("", text, function(err, summary){
        if (err)
            fn(new Error(err))
        else {
            fn(null, summary.split(" "))
        }
    })
}
