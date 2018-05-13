import got from 'got'
import _ from 'lodash'

const emojifiSummary = async summary => {
  let emojis = []
  for (var i = 0, l = summary.length; i < l; i++) {
    let item = summary[i]
    let { body: { results } } = await getEmojis(item)
    _.map(results, i => {
      if (i.score > 0.075) emojis.push(i.text)
    })
  }
  let uniqEmojis = _.join(_.uniq(emojis), ' ')
  return new Promise((resolve, reject) => {
    resolve(uniqEmojis)
  })
}

const getEmojis = async item => {
  return got('emoji.getdango.com/api/emoji', {
    json: true,
    query: {
      q: item
    }
  })
}

export default emojifiSummary
