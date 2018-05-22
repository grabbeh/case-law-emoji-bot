'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseUrl = () => {
  var num = _lodash2.default.random(0, 650).toString();
  if (num.length === 1) num = `000${num}`;
  if (num.length === 2) num = `00${num}`;
  if (num.length === 3) num = `0${num}`;
  return `http://www.bailii.org/indices/all-cases-${num}.html`;
};

exports.default = baseUrl;