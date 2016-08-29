# case-law-emoji-bot

This bot grabs a case from www.bailii.org, runs it through a text summariser, converts it to emoji and posts to Twitter.

In future you can maybe tweet a law case URL to him and he will respond with an emoji summary.

# Responding to Tweets

- GET https://api.twitter.com/1.1/statuses/mentions_timeline.json
- Check ID store to see if any new tweets need responding to
- If there are new tweets, process them accordingly
- Reply with person mentioning, with emoji summary only

# Firebase

`var firebase = require("firebase");

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: "https://databaseName.firebaseio.com",
  serviceAccount: "path/to/serviceAccountCredentials.json"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});`
