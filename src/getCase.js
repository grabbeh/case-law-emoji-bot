import axios from 'axios'
import provideCaseUrl from './provideCaseUrl'
import baseUrl from './baseUrl'
import unfluff from 'unfluff'

const getCase = async mentionUrl => {
  let url
  if (mentionUrl) url = mentionUrl
  else url = await provideCaseUrl(baseUrl())
  let { data } = await axios(url)
  let { text } = unfluff(data)
  // if random case and length is low, we call getCase again
  if (!(text.length > 2000) && !mentionUrl) {
    return getCase(mentionUrl)
  } else {
    return { url, text }
  }
}

export default getCase
