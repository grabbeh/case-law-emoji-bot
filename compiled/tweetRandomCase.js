'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getEmojiSummary = require('./getEmojiSummary');

var _getEmojiSummary2 = _interopRequireDefault(_getEmojiSummary);

var _tweet = require('./tweet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tweetRandomCase = async () => {
  let { summary, url } = await (0, _getEmojiSummary2.default)();
  let status = `${url} ${summary}`;
  status.slice(0, 270);
  let content = { status };
  try {
    await (0, _tweet.newTweet)(content);
  } catch (e) {
    console.log(e);
  }
};

tweetRandomCase();

exports.default = tweetRandomCase;