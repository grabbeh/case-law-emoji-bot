var summarise = require("nodejs-text-summarizer"),
    _ = require("underscore");

module.exports = function(text, fn){
    var summary = summarise(text).split(' ');
    fn(null, _.without(summary, "BAILII", " "));
}