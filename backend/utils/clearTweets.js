const removeHandlesFromTweet = require("./removeHandlesFromTweet");
const removeLinksFromTweet = require("./removeLinksFromTweet");
const removeEmojisFromTweet = require("./removeEmojisFromTweet");
const removeAccentsFromTweet = require("./removeAccentsFromTweet");
const tweetLematization = require("./tweetLematization");

const removeWords = (tweet) => {
  const clearedTweet = removeAccentsFromTweet(
    removeEmojisFromTweet(removeLinksFromTweet(removeHandlesFromTweet(tweet)))
  );

  return clearedTweet;
};

// const lemmatizedTweets = async (tweet) => {
//   const lemmaWords = await tweetLematization(tweet);

//   return lemmaWords;
// };

const clearTweets = (tweets) => {
  const filteredTweets = tweets.map((tweet) => ({
    ...tweet,
    clearedTweet: removeWords(tweet.text),
  }));

  // await filteredTweets.forEach((tweet) => {
  //   console.log(tweetLematization(tweet.clearedTweet));
  // });

  // console.log(filteredTweets);

  return filteredTweets;
};

module.exports = clearTweets;
