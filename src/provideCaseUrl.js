import cheerio from 'cheerio'
import _ from 'underscore'
import axios from 'axios'

const provideCaseUrl = async url => {
  let response = await axios(url)
  let $ = cheerio.load(response.data)
  let urlArray = $('ul')
    .find('li')
    .find('a')
    .map(function (index, el) {
      return $(this).attr('href')
    })

  // check for 0 if 0 get new case
  return `http://www.bailii.org${_.sample(_.values(urlArray))}`
}

export default provideCaseUrl
