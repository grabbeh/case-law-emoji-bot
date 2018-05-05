'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTweet = exports.getMentions = exports.newTweet = undefined;

var _twitter = require('../config/twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _twitter3 = require('twitter');

var _twitter4 = _interopRequireDefault(_twitter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const client = new _twitter4.default({
  consumer_key: _twitter2.default.consumerkey,
  consumer_secret: _twitter2.default.consumerSecret,
  access_token_key: _twitter2.default.accessKey,
  access_token_secret: _twitter2.default.accessSecret
});

const newTweet = async content => {
  return client.post('statuses/update', content);
};

const getMentions = async () => {
  return client.get('statuses/mentions_timeline', {});
};

const getTweet = function (id) {
  return client.get('statuses/show/', { id });
};

exports.newTweet = newTweet;
exports.getMentions = getMentions;
exports.getTweet = getTweet;