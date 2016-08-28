var _ = require('underscore');

module.exports = function(){
    var num = _.random(0, 550).toString();
    if (num.length === 1) 
        num = "000" + num;
    if (num.length === 2)
        num = "00" + num;
    if (num.length === 3)
        num = "0" + num;
    var BailiiUrl = "http://www.bailii.org/indices/all-cases-" + num + ".html";
    return BailiiUrl;
}

