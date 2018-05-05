'use strict';

var _tweet = require('./tweet');

const test = async id => {
  try {
    let res = await (0, _tweet.getTweet)(id);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

test(770241796844691500);