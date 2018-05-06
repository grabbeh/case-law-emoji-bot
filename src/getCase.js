import cheerio from 'cheerio'
import request from 'async-request'
import provideCaseUrl from './provideCaseUrl'
import baseUrl from './baseUrl'

const getCase = async () => {
  let url = await provideCaseUrl(baseUrl())
  let { body } = await request(url)
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(body)
    let caseText = $('body')
      .find('p')
      .map(function (index, el) {
        return $(this).text()
      })
      .get()
      .join(' ')
    if (caseText.length > 3000) resolve({ url, caseText })
    else getCase()
  })
}

export default getCase
