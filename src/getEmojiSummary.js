import getCase from './getCase'
import summariseCase from './summariseCase'
import emojifySummary from './emojifySummary'

// Takes URL from Bailii.org and returns emoji summary
const getEmojiSummary = async mentionUrl => {
  try {
    let { url, caseText } = await getCase(mentionUrl)
    // getCase not returning if recursive call
    console.log(url)
    let caseSummary = await summariseCase(caseText)
    let summary = await emojifySummary(caseSummary)
    return new Promise((resolve, reject) => {
      resolve({ url, summary })
    })
  } catch (e) {
    console.log(e)
  }
  // not returning url where multiple getCase calls
}

export default getEmojiSummary
