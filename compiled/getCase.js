'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _asyncRequest = require('async-request');

var _asyncRequest2 = _interopRequireDefault(_asyncRequest);

var _provideCaseUrl = require('./provideCaseUrl');

var _provideCaseUrl2 = _interopRequireDefault(_provideCaseUrl);

var _baseUrl = require('./baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCase = async mentionUrl => {
  let url;
  if (mentionUrl) url = mentionUrl;else url = await (0, _provideCaseUrl2.default)((0, _baseUrl2.default)());
  let { body } = await (0, _asyncRequest2.default)(url);
  let $ = _cheerio2.default.load(body);
  let caseText = $('body').find('div').find('p').map(function (index, el) {
    return $(this).text();
  }).get().join(' ');
  if (!(caseText.length > 3000)) {
    return getCase(mentionUrl);
  } else {
    return { url, caseText };
  }
};

exports.default = getCase;