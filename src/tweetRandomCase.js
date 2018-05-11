import getEmojiSummary from './getEmojiSummary'
import { newTweet } from './tweet'

const tweetRandomCase = async () => {
  let { summary, url } = await getEmojiSummary()
  let fullStatus = `${url} ${summary}`
  let status = fullStatus.slice(0, 260)
  let content = { status }
  try {
    await newTweet(content)
  } catch (e) {
    console.log(e)
  }
}

export default tweetRandomCase
