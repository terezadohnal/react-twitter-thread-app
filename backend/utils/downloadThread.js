const downloadTweets = require("./downloadTweets");
const clearTweets = require("../utils/clearTweets");

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
    const clearedTweets = await clearTweets(tweets);
    return clearedTweets;
  } catch (error) {
    console.log(error);
  }
};

module.exports = downloadThread;
