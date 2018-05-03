'use strict';

const tool = require('./tweet');

tool.getTweet('770241796844691456', function (err, res) {
  if (err) console.log(err);else console.log(res);
});