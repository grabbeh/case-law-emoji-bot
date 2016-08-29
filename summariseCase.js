var tool = require("node-summary")

module.exports = function(text, fn){
    tool.summarize("", text, function(err, summary){
        if (err)
            fn(new Error(err));
        else {
            summary.split(" ");
            fn(null, summary)
        }
    })
}