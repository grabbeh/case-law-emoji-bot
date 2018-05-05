import getEmojiSummary from './getEmojiSummary'
import baseUrl from './baseUrl'
import provideCaseUrl from './provideCaseUrl'
import { newTweet } from './tweet'

const tweetRandomCase = async () => {
  let url = await provideCaseUrl(baseUrl())
  let emojiSummary = await getEmojiSummary(url)
  let status = `${url} ${emojiSummary}`
  status.slice(0, 270)
  let content = { status }
  try {
    await newTweet(content)
  } catch (e) {
    console.log(e)
  }
}

export default tweetRandomCase
