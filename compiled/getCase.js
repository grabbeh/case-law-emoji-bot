'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _provideCaseUrl = require('./provideCaseUrl');

var _provideCaseUrl2 = _interopRequireDefault(_provideCaseUrl);

var _baseUrl = require('./baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

var _unfluff = require('unfluff');

var _unfluff2 = _interopRequireDefault(_unfluff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCase = async mentionUrl => {
  let url;
  if (mentionUrl) url = mentionUrl;else url = await (0, _provideCaseUrl2.default)((0, _baseUrl2.default)());
  let { data } = await (0, _axios2.default)(url);
  let { text } = (0, _unfluff2.default)(data);
  // if random case and length is low, we call getCase again
  if (!(text.length > 2000) && !mentionUrl) {
    return getCase(mentionUrl);
  } else {
    return { url, text };
  }
};

exports.default = getCase;