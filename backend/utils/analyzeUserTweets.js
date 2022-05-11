const analyzeTopics = require("./analyzeTopics");
const downloadThread = require("./downloadThread");

const analyzeUserTweets = async ({ ids }) => {
  const tweets = [];
  let index = 0;

  try {
    while (index < ids.length) {
      console.log("analyzing: ", index);

      const tweetArr = await downloadThread(ids[index]);
      tweets.push(tweetArr);

      index++;
    }

    const flatTweets = tweets.flat();
    const tweetCount = flatTweets.length;
    const mergedTweets = flatTweets
      .map((tweet) => tweet.clearedTweet)
      .join(". ");

    const topics = await analyzeTopics(mergedTweets);

    return {
      topics,
      tweetCount,
    };
  } catch (error) {
    console.log(error);

    const flatTweets = tweets.flat();
    const tweetCount = flatTweets.length;
    const mergedTweets = flatTweets
      .map((tweet) => tweet.clearedTweet)
      .join(". ");

    const topics = await analyzeTopics(mergedTweets);

    return {
      topics,
      tweetCount,
    };
  }
};

module.exports = analyzeUserTweets;
