import getEmojiSummary from './getEmojiSummary'
import baseUrl from './baseUrl'
import provideCaseUrl from './provideCaseUrl'
import { newTweet } from './tweet'

const tweetRandomCase = async () => {
  let url = await provideCaseUrl(baseUrl())
  let emojiSummary = await getEmojiSummary(url)
  let status = `${url} ${emojiSummary}`
  status.slice(0, 280)
  let content = { status }
  console.log(content)
  newTweet(content, function (err, res) {
    if (err) console.log(err)
    else console.log('Tweet posted')
  })
}

export default tweetRandomCase
