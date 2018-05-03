'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient({
  keyFilename: '../config/google.json'
});

const summariseCase = async content => {
  let results = await client.analyzeEntities({
    document: {
      content,
      type: 'PLAIN_TEXT'
    }
  });

  return new Promise((resolve, reject) => {
    resolve(_underscore2.default.map(results[0].entities, function (i) {
      return i.name;
    }));
  });
};

exports.default = summariseCase;