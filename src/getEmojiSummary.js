import getCase from './getCase'
import summariseCase from './summariseCase'
import emojifySummary from './emojifySummary'

// Takes URL from Bailii.org and returns emoji summary
const getEmojiSummary = async mentionUrl => {
  let { url, caseText } = await getCase(mentionUrl)
  let caseSummary = await summariseCase(caseText)
  let summary = await emojifySummary(caseSummary)
  return new Promise((resolve, reject) => {
    resolve({ url, summary })
  })
}

export default getEmojiSummary
