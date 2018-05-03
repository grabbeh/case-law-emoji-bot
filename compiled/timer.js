'use strict';

var _tweetMentionedCase = require('./tweetMentionedCase');

var _tweetMentionedCase2 = _interopRequireDefault(_tweetMentionedCase);

var _tweetRandomCase = require('./tweetRandomCase');

var _tweetRandomCase2 = _interopRequireDefault(_tweetRandomCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setInterval(tweetMentionedCase, 1000 * 60 * 5)

// setInterval(tweetRandomCase, 1000 * 60 * 60 * 24)

// setTimeout(tweetMentionedCase, 1000)

(0, _tweetRandomCase2.default)();