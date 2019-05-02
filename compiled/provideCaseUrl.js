'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const provideCaseUrl = async url => {
  let response = await (0, _axios2.default)(url);
  let $ = _cheerio2.default.load(response.data);
  let urlArray = $('ul').find('li').find('a').map(function (index, el) {
    return $(this).attr('href');
  });

  // check for 0 if 0 get new case
  return `http://www.bailii.org${_underscore2.default.sample(_underscore2.default.values(urlArray))}`;
};

exports.default = provideCaseUrl;