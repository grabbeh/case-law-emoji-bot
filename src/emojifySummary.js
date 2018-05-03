import got from 'got'
import _ from 'lodash'

const emojifiSummary = async summary => {
  let emojis = []
  for (const item in summary) {
    let { body: { results } } = await getSummary(item)
    _.map(results, i => {
      if (i.score > 0) emojis.push(i.text)
    })
  }
  let uniqEmojis = _.join(_.uniq(emojis), ' ')
  return new Promise((resolve, reject) => {
    resolve(uniqEmojis)
  })
}

const getSummary = async item => {
  return got('emoji.getdango.com/api/emoji', {
    json: true,
    query: {
      q: item
    }
  })
}

export default emojifiSummary
