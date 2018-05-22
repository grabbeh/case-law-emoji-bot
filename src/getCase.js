import request from 'async-request'
import provideCaseUrl from './provideCaseUrl'
import baseUrl from './baseUrl'
import unfluff from 'unfluff'

const getCase = async mentionUrl => {
  let url
  if (mentionUrl) url = mentionUrl
  else url = await provideCaseUrl(baseUrl())
  let { body } = await request(url)
  let { text } = unfluff(body)
  // if random case and length is low, we call getCase again
  if (!(text.length > 2000) && !mentionUrl) {
    return getCase(mentionUrl)
  } else {
    return { url, text }
  }
}

export default getCase
