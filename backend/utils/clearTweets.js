const removeHandlesFromTweet = require("./removeHandlesFromTweet");
const removeLinksFromTweet = require("./removeLinksFromTweet");
const removeEmojisFromTweet = require("./removeEmojisFromTweet");
const removeAccentsFromTweet = require("./removeAccentsFromTweet");

const removeWords = (tweet) => {
  const clearedTweet = removeAccentsFromTweet(
    removeEmojisFromTweet(removeLinksFromTweet(removeHandlesFromTweet(tweet)))
  );
  return clearedTweet;
};

const clearTweets = (tweets) => {
  const filteredTweets = tweets.map((tweet) => ({
    ...tweet,
    clearedTweet: removeWords(tweet.text),
  }));

  return filteredTweets;
};

module.exports = clearTweets;
