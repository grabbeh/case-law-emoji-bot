'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _asyncRequest = require('async-request');

var _asyncRequest2 = _interopRequireDefault(_asyncRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const provideCaseUrl = async url => {
  let { body } = await (0, _asyncRequest2.default)(url);
  let $ = _cheerio2.default.load(body);
  let urlArray = $('ul').find('li').find('a').map(function (index, el) {
    return $(this).attr('href');
  });
  return `http://www.bailii.org${_underscore2.default.sample(_underscore2.default.values(urlArray))}`;
};

exports.default = provideCaseUrl;