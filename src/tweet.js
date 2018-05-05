import cfg from '../config/twitter'
import Twitter from 'twitter'
const client = new Twitter({
  consumer_key: cfg.consumerkey,
  consumer_secret: cfg.consumerSecret,
  access_token_key: cfg.accessKey,
  access_token_secret: cfg.accessSecret
})

const newTweet = async content => {
  return client.post('statuses/update', content)
}

const getMentions = async () => {
  return client.get('statuses/mentions_timeline', {})
}

const getTweet = function (id) {
  return client.get('statuses/show/', { id })
}

export { newTweet, getMentions, getTweet }
