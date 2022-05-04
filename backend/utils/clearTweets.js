const removeHandlesFromTweet = require("./removeHandlesFromTweet");
const removeLinksFromTweet = require("./removeLinksFromTweet");
const removeEmojisFromTweet = require("./removeEmojisFromTweet");
const removeAccentsFromTweet = require("./removeAccentsFromTweet");
const lemmaText = require("./lemmaText");

const removeWords = (tweet) => {
  const clearedTweet = removeAccentsFromTweet(
    removeEmojisFromTweet(removeLinksFromTweet(removeHandlesFromTweet(tweet)))
  );
  return clearedTweet;
};

const clearTweets = async (tweets) => {
  const clearedTweets = [];
  const filteredTweets = tweets.map((tweet) => ({
    ...tweet,
    clearedTweet: removeWords(tweet.text),
  }));
  let index = 0;

  try {
    while (index < filteredTweets.length) {
      const lemma = await lemmaText(filteredTweets[index].clearedTweet);
      clearedTweets.push({ ...filteredTweets[index], lemma });
      index++;
    }

    return clearedTweets;
  } catch (error) {
    console.log("Lemma goes wrong!", error);
    return filteredTweets;
  }
};

module.exports = clearTweets;
