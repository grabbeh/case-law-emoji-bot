import _ from 'lodash'
import language from '@google-cloud/language'

const client = new language.LanguageServiceClient({
  keyFilename: '../config/google.json'
})

const summariseCase = async content => {
  let results = await client.analyzeEntities({
    document: {
      content,
      type: 'PLAIN_TEXT'
    }
  })

  let r = _.map(results[0].entities, function (i) {
    return i.name
  })

  var occurrences = r.reduce(function (obj, item) {
    obj[item] = (obj[item] || 0) + 1
    return obj
  }, {})

  let sortable = []
  for (var key in occurrences) {
    sortable.push([key, occurrences[key]])
  }

  sortable
    .sort(function (a, b) {
      return a[1] - b[1]
    })
    .reverse()

  let revised = _.map(sortable.slice(0, 100), i => {
    return i[0]
  })
  return revised
}

export default summariseCase
