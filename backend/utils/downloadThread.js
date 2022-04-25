const axios = require("axios");
const downloadTweets = require("./downloadTweets");

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
  } catch (error) {
    console.log(error);
  }

  return tweets;
};

module.exports = downloadThread;
