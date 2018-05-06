import getEmojiSummary from './getEmojiSummary'
import { newTweet } from './tweet'

const tweetRandomCase = async () => {
  let { summary, url } = await getEmojiSummary()
  let status = `${url} ${summary}`
  status.slice(0, 270)
  let content = { status }
  try {
    await newTweet(content)
  } catch (e) {
    console.log(e)
  }
}

tweetRandomCase()

export default tweetRandomCase
