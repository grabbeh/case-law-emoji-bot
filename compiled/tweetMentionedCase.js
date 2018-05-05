'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweet = require('./tweet');

var _getEmojiSummary = require('./getEmojiSummary');

var _getEmojiSummary2 = _interopRequireDefault(_getEmojiSummary);

var _asyncRequest = require('async-request');

var _asyncRequest2 = _interopRequireDefault(_asyncRequest);

var _util = require('util');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFileAsync = (0, _util.promisify)(_fs2.default.readFile);
const writeFileAsync = (0, _util.promisify)(_fs2.default.writeFile);

const getProcessedMentions = async () => {
  let data = await readFileAsync('../processedMentions.json');
  return JSON.parse(data);
};

let testMentions = [{ text: '@grabbeh I am impressed! @caselawemoji', id_str: '123456789' }, {
  text: 'this is the one https://t.co/ywUHRHBu47',
  id_str: '770241796844691456',
  user: { screen_name: 'grabbeh' }
}, { text: 'This tweet does not contain a URL', id_str: '432423423' }, { text: 'HELLO WORLD', id_str: '987654321' }];

const tweetMentionedCase = async () => {
  let mentions = await (0, _tweet.getMentions)();
  checkMentions(mentions);
};

const checkMentions = async mentions => {
  let bailiiMentions = await extractAnyBailiiLinks(mentions);
  for (var i = 0, l = bailiiMentions.length; i < l; i++) {
    await replyToMention(bailiiMentions[i]);
  }
};

const extractAnyBailiiLinks = async mentions => {
  let bailiiMentions = [];
  for (var i = 0, l = mentions.length; i < l; i++) {
    let bailiiLink = await returnBailiiLink(mentions[i].text, mentions[i].id_str);
    if (bailiiLink) {
      mentions[i].url = bailiiLink;
      bailiiMentions.push(mentions[i]);
    }
  }
  return new Promise((resolve, reject) => {
    resolve(bailiiMentions);
  });
};

const replyToMention = async mention => {
  let emojiSummary = await (0, _getEmojiSummary2.default)(mention.url);
  if (!emojiSummary) {
    console.log('Error');
  } else {
    var status = `@${mention.user.screen_name} ${emojiSummary}`;
    status = status.slice(0, 280);
    let content = { status, in_reply_to_status_id: mention.id_str };
    (0, _tweet.newTweet)(content, function (err, res) {
      if (err) new Error(err);else console.log('Tweet');
    });
  }
};

const returnBailiiLink = async (text, id) => {
  let newMention = await filterProcessedMentions(id);
  if (newMention) {
    addToList(newMention);
    let link = checkForLink(text);
    if (link) {
      let expandedLink = await expandLink(link);
      let bailiiLink = await checkIfBailiiLink(expandedLink);
      if (bailiiLink) {
        return new Promise((resolve, reject) => {
          resolve(bailiiLink);
        });
      }
    }
  }
};

const filterProcessedMentions = async id => {
  let data = await getProcessedMentions();
  if (data.includes(id)) return false;else return id;
};

const addToList = async id => {
  let data = await getProcessedMentions();
  data.push(id);
  return writeFileAsync('../processedMentions.json', JSON.stringify(data));
};

const checkForLink = text => {
  if (text.indexOf('http') !== -1) {
    var link = text.slice(text.indexOf('http')).split(' ')[0];
    return link;
  } else {
    return false;
  }
};
// URL expander borked
const expandLink = async url => {
  var urlExpander = `https://unshorten.me/json/${url}`;
  let res = await (0, _asyncRequest2.default)(urlExpander);
  return new Promise((resolve, reject) => {
    let url = JSON.parse(res.body).resolved_url;
    resolve(url);
  });
};

function checkIfBailiiLink(url) {
  if (url && url.indexOf('bailii') !== -1) {
    return url;
  } else {
    return false;
  }
}

exports.default = tweetMentionedCase;