import { getMentions, newTweet } from './tweet'
import getEmojiSummary from './getEmojiSummary'
import { promisify } from 'util'
import fs from 'fs'
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const getProcessedMentions = async () => {
  let data = await readFileAsync('../processedMentions.json')
  return JSON.parse(data)
}

let testMentions = [
  { text: '@grabbeh I am impressed! @caselawemoji', id_str: '123456789' },
  {
    text: 'this is the one https://t.co/ywUHRHBu47',
    id_str: '770241796844691456',
    user: { screen_name: 'grabbeh' }
  },
  { text: 'This tweet does not contain a URL', id_str: '432423423' },
  { text: 'HELLO WORLD', id_str: '987654321' }
]

const tweetMentionedCase = async () => {
  // let mentions = await getMentions()
  checkMentions(testMentions)
}

const checkMentions = async mentions => {
  let bailiiMentions = await extractAnyBailiiLinks(mentions)
  if (bailiiMentions.length > 0) {
    for (var i = 0, l = bailiiMentions.length; i < l; i++) {
      try {
        await replyToMention(bailiiMentions[i])
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    console.log('No mentions')
  }
}

const extractAnyBailiiLinks = async mentions => {
  let bailiiMentions = []
  for (var i = 0, l = mentions.length; i < l; i++) {
    let bailiiLink = await returnBailiiLink(mentions[i])
    if (bailiiLink) {
      mentions[i].url = bailiiLink
      bailiiMentions.push(mentions[i])
    }
  }
  return bailiiMentions
}

const replyToMention = async mention => {
  let { id_str, url } = mention
  let { summary } = await getEmojiSummary(url)
  let status = `@${mention.user.screen_name} ${summary}`
  status = status.slice(0, 270)
  let content = { status, in_reply_to_status_id: id_str }
  try {
    await newTweet(content)
    await addToList(id_str)
    console.log('Tweet posted')
  } catch (e) {
    console.log(e)
  }
}

const returnBailiiLink = async mention => {
  let newMention = await filterProcessedMentions(mention.id_str)
  if (newMention) {
    let bailiiLink = await checkIfBailiiLink(mention)
    if (bailiiLink) return bailiiLink
  }
}

const filterProcessedMentions = async id => {
  let data = await getProcessedMentions()
  if (data.includes(id)) return false
  else return id
}

const addToList = async id => {
  let data = await getProcessedMentions()
  data = [...data, id]
  return writeFileAsync('../processedMentions.json', JSON.stringify(data))
}

function checkIfBailiiLink (mention) {
  let {
    entities: { urls }
  } = mention
  if (urls.length === 0) return false
  if (urls[0].expanded_url.indexOf('bailii') !== -1) {
    return urls[0].expanded_url
  } else {
    return false
  }
}

tweetMentionedCase()

export default tweetMentionedCase
