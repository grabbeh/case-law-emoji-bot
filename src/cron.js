import cron from 'node-cron'

cron.schedule('/1 * * * *', () => {
  '/usr/bin/node /mnt/c/Users/mbg/Documents/case-law-emoji-bot/compiled/tweetRandomCase'
})

cron.schedule('*/5 * * * *', () => {
  '/usr/bin/node /mnt/c/Users/mbg/Documents/case-law-emoji-bot/compiled/tweetMentionedCase'
})

cron.schedule('*/1 * * * *', () => {
  '/usr/local/bin/node /mnt/c/Users/mbg/Documents/case-law-emoji-bot/compiled/test.js'
})
