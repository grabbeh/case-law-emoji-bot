import cron from 'node-cron'
import tweetRandomCase from './tweetRandomCase'
import tweetMentionedCase from './tweetMentionedCase'

cron.schedule('5 10 * * *', () => {
  tweetRandomCase()
})

cron.schedule('5 * * * *', () => {
  tweetMentionedCase()
})
