'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cfg = require('../config/twitter');
const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: cfg.consumerkey,
  consumer_secret: cfg.consumerSecret,
  access_token_key: cfg.accessKey,
  access_token_secret: cfg.accessSecret
});

const newTweet = function (content, fn) {
  client.post('statuses/update', content, function (err, tweet, response) {
    if (err) fn(err);else fn(null, response);
  });
};

const getMentions = function (fn) {
  client.get('statuses/mentions_timeline', function (err, mentions, response) {
    if (err) {
      fn(err);
    } else !err;
    fn(null, mentions);
  });
};

const getTweet = function (id, fn) {
  client.get('statuses/show/' + id, {}, function (err, tweet, response) {
    if (err) fn(err);else fn(null, tweet);
  });
};

exports.newTweet = newTweet;
exports.getMentions = getMentions;
exports.getTweet = getTweet;