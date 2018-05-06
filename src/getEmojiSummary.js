import getCase from './getCase'
import summariseCase from './summariseCase'
import emojifySummary from './emojifySummary'

// Takes URL from Bailii.org and returns emoji summary
const getEmojiSummary = async () => {
  let { url, caseText } = await getCase()
  let caseSummary = await summariseCase(caseText)
  let amended = caseSummary.slice(0, 100)
  let summary = await emojifySummary(amended)
  return new Promise((resolve, reject) => {
    resolve({ url, summary })
  })
}

export default getEmojiSummary
