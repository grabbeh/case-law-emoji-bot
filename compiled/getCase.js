'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _asyncRequest = require('async-request');

var _asyncRequest2 = _interopRequireDefault(_asyncRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCase = async url => {
  let { body } = await (0, _asyncRequest2.default)(url);
  return new Promise((resolve, reject) => {
    let $ = _cheerio2.default.load(body);
    let caseText = $('body').find('p').map(function (index, el) {
      return $(this).text();
    }).get().join(' ');
    resolve(caseText);
  });
};

exports.default = getCase;