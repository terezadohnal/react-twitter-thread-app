const axios = require("axios");
const downloadTweets = require("./downloadTweets");
const clearTweets = require("../utils/clearTweets");
const analyzeTopics = require("./analyzeTopics");

const downloadThread = async (id) => {
  const tweets = [];

  try {
    const response = await downloadTweets(id);
    tweets.push(...response.data);
    let nextToken = response.meta.next_token;

    while (nextToken) {
      const nextResponse = await downloadTweets(id, nextToken);
      tweets.push(...nextResponse.data);
      nextToken = nextResponse.meta.next_token;
    }

    const clearedTweets = clearTweets(tweets);
    const topics = await analyzeTopics(clearedTweets);
    console.log(topics);
  } catch (error) {
    console.log(error);
  }

  return tweets;
};

module.exports = downloadThread;
