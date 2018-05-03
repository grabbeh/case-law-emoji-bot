import _ from 'underscore'

const language = require('@google-cloud/language')

// Instantiates a client
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

  return new Promise((resolve, reject) => {
    resolve(
      _.map(results[0].entities, function (i) {
        return i.name
      })
    )
  })
}

export default summariseCase
