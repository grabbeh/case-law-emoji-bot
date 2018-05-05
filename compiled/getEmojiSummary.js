'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getCase = require('./getCase');

var _getCase2 = _interopRequireDefault(_getCase);

var _summariseCase = require('./summariseCase');

var _summariseCase2 = _interopRequireDefault(_summariseCase);

var _emojifySummary = require('./emojifySummary');

var _emojifySummary2 = _interopRequireDefault(_emojifySummary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes URL from Bailii.org and returns emoji summary
const getEmojiSummary = async url => {
  let caseDetails = await (0, _getCase2.default)(url);
  let caseSummary = await (0, _summariseCase2.default)(caseDetails);
  let amended = caseSummary.slice(0, 100);
  let emojiSummary = await (0, _emojifySummary2.default)(amended);
  return new Promise((resolve, reject) => {
    resolve(emojiSummary);
  });
};

exports.default = getEmojiSummary;