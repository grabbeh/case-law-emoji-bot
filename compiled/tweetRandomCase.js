'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getEmojiSummary = require('./getEmojiSummary');

var _getEmojiSummary2 = _interopRequireDefault(_getEmojiSummary);

var _baseUrl = require('./baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

var _provideCaseUrl = require('./provideCaseUrl');

var _provideCaseUrl2 = _interopRequireDefault(_provideCaseUrl);

var _tweet = require('./tweet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tweetRandomCase = async () => {
  let url = await (0, _provideCaseUrl2.default)((0, _baseUrl2.default)());
  let emojiSummary = await (0, _getEmojiSummary2.default)(url);
  let status = `${url} ${emojiSummary}`;
  status.slice(0, 280);
  let content = { status };
  console.log(content);
  (0, _tweet.newTweet)(content, function (err, res) {
    if (err) console.log(err);else console.log('Tweet posted');
  });
};

exports.default = tweetRandomCase;