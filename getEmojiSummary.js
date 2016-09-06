const provideCaseUrl = require("./provideCaseUrl"),
    getCase = require("./getCase"),
    summariseCase = require("./summariseCase"),
    emojifySummary = require("./emojifySummary"),
    async = require('async');

// Takes URL from Bailii.org and returns emoji summary
module.exports = function(url, fn){
    async.auto({
        caseDetails: function(cb){
            getCase(url, cb)
        },
        caseSummary: ['caseDetails', function(results, cb){
            summariseCase(results.caseDetails, cb)
        }],
        emojiSummary: ['caseDetails', 'caseSummary', function(results, cb){
            emojifySummary(results.caseSummary, cb)
        }]
        }, 
    function(err, results){
        if (err)
            fn(new Error(err))
        else
            fn(null, results)
    })
}