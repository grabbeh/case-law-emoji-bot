'use strict';

var _tweetMentionedCase = require('./tweetMentionedCase');

var _tweetMentionedCase2 = _interopRequireDefault(_tweetMentionedCase);

var _tweetRandomCase = require('./tweetRandomCase');

var _tweetRandomCase2 = _interopRequireDefault(_tweetRandomCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

setInterval(_tweetMentionedCase2.default, 1000 * 60 * 5);

setInterval(_tweetRandomCase2.default, 1000 * 60 * 60 * 24);