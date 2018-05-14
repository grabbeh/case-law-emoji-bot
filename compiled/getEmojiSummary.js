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
const getEmojiSummary = async mentionUrl => {
  try {
    let { url, caseText } = await (0, _getCase2.default)(mentionUrl);
    // getCase not returning if recursive call
    console.log(url);
    let caseSummary = await (0, _summariseCase2.default)(caseText);
    let summary = await (0, _emojifySummary2.default)(caseSummary);
    return new Promise((resolve, reject) => {
      resolve({ url, summary });
    });
  } catch (e) {
    console.log(e);
  }
  // not returning url where multiple getCase calls
};

exports.default = getEmojiSummary;