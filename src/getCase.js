import cheerio from 'cheerio'
import request from 'async-request'

const getCase = async url => {
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
    resolve(caseText)
  })
}

export default getCase
