import getCase from './getCase'
import summariseCase from './summariseCase'
import emojifySummary from './emojifySummary'

// Takes URL from Bailii.org and returns emoji summary
const getEmojiSummary = async mentionUrl => {
  try {
    let { url, text } = await getCase(mentionUrl)
    // getCase not returning if recursive callF
    let caseSummary = await summariseCase(text)
    let summary = await emojifySummary(caseSummary)
    return { url, summary }
  } catch (e) {
    console.log(e)
  }
  // not returning url where multiple getCase calls
}

export default getEmojiSummary
