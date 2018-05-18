'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _language = require('@google-cloud/language');

var _language2 = _interopRequireDefault(_language);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const client = new _language2.default.LanguageServiceClient({
  keyFilename: '../config/google.json'
});

const summariseCase = async content => {
  let results = await client.analyzeEntities({
    document: {
      content,
      type: 'PLAIN_TEXT'
    }
  });

  let r = _lodash2.default.map(results[0].entities, function (i) {
    return i.name;
  });

  var occurrences = r.reduce(function (obj, item) {
    obj[item] = (obj[item] || 0) + 1;
    return obj;
  }, {});

  let sortable = [];
  for (var key in occurrences) {
    sortable.push([key, occurrences[key]]);
  }

  sortable.sort(function (a, b) {
    return a[1] - b[1];
  }).reverse();

  let revised = _lodash2.default.map(sortable.slice(0, 100), i => {
    return i[0];
  });
  return revised;
};

exports.default = summariseCase;