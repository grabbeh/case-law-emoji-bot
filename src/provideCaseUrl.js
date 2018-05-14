import cheerio from 'cheerio'
import _ from 'underscore'
import request from 'async-request'

const provideCaseUrl = async url => {
  let { body } = await request(url)
  return new Promise(resolve => {
    let $ = cheerio.load(body)
    let urlArray = $('ul').find('li').find('a').map(function (index, el) {
      return $(this).attr('href')
    })
    resolve(`http://www.bailii.org${_.sample(_.values(urlArray))}`)
  })
}

export default provideCaseUrl
