const analyzeTopics = require('./analyzeTopics');
const downloadThread = require('./downloadThread');
const removeStopWords = require('./removeStopWords');
const fs = require('fs');

const analyzeUserTweets = async ({ ids, username }) => {
  const tweets = [];
  let index = 0;

  try {
    while (index < ids.length) {
      const tweetArr = await downloadThread(ids[index]);
      console.log(
        `analyzed tweet no.: ${index} with ${tweetArr.length} replies`
      );
      tweets.push(tweetArr);

      index++;
    }

    const flatTweets = tweets.flat();
    const tweetCount = flatTweets.length;
    const mergedTweets = flatTweets
      .map((tweet) => tweet.clearedTweet)
      .join('. ')
      .replace(/[\r\n]/gm, '');

    const now = new Date().toLocaleTimeString();

    fs.writeFile(`${username}-text-${now}.txt`, mergedTweets, function (err) {
      if (err) return console.log(err);
    });

    const textWithNoStopWords = await removeStopWords(mergedTweets);

    fs.writeFile(
      `${username}-text-no-stop-words-${now}.txt`,
      textWithNoStopWords,
      function (err) {
        if (err) return console.log(err);
      }
    );

    const topics = await analyzeTopics(textWithNoStopWords);

    fs.writeFile(
      `${username}-topics-${now}.txt`,
      topics.flat().join(', '),
      function (err) {
        if (err) return console.log(err);
      }
    );

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
      .join('. ');

    const textWithNoStopWords = await removeStopWords(mergedTweets);
    const topics = await analyzeTopics(textWithNoStopWords);

    return {
      topics,
      tweetCount,
    };
  }
};

module.exports = analyzeUserTweets;
