import cheerio from 'cheerio'
import _ from 'underscore'
import request from 'async-request'

const provideCaseUrl = async url => {
  let { body } = await request(url)
  let $ = cheerio.load(body)
  let urlArray = $('ul').find('li').find('a').map(function (index, el) {
    return $(this).attr('href')
  })
  return `http://www.bailii.org${_.sample(_.values(urlArray))}`
}

export default provideCaseUrl
