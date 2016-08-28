# case-law-emoji-bot

Plan

1. Categories of cases on Bailii run from http://www.bailii.org/indices/all-cases-0001.html to http://www.bailii.org/indices/all-cases-0550.html so need to construct a URL to grab one of URLs within range. 
2. Then extract case law URLs using Cheerio and then grab case URL
3. Extract text from case and run through text analyser.
4. Run results against emoji dictionary and post results to Twitter
5. Use Agenda or suchlike to run above process once every 24 hours
6. Allow users to submit case law URL (from set list to avoid abuse potentially?) and have program respond with emoji summary
