'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emojifiSummary = async summary => {
  let emojis = [];
  for (var i = 0, l = summary.length; i < l; i++) {
    let item = summary[i];
    let { body: { results } } = await getEmojis(item);
    _lodash2.default.map(results, i => {
      if (i.score > 0.075) emojis.push(i.text);
    });
  }
  let uniqEmojis = _lodash2.default.join(_lodash2.default.uniq(emojis), ' ');
  return new Promise((resolve, reject) => {
    resolve(uniqEmojis);
  });
};

const getEmojis = async item => {
  return (0, _got2.default)('emoji.getdango.com/api/emoji', {
    json: true,
    query: {
      q: item
    }
  });
};

exports.default = emojifiSummary;