import getCase from './getCase'
import summariseCase from './summariseCase'
import emojifySummary from './emojifySummary'

// Takes URL from Bailii.org and returns emoji summary
const getEmojiSummary = async url => {
  let caseDetails = await getCase(url)
  let caseSummary = await summariseCase(caseDetails)
  let amended = caseSummary.slice(0, 100)
  let emojiSummary = await emojifySummary(amended)
  return new Promise((resolve, reject) => {
    resolve(emojiSummary)
  })
}

export default getEmojiSummary
