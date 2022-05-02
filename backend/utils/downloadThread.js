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
  } catch (error) {
    console.log(error);
  }

  const clearedTweets = clearTweets(tweets);

  return clearedTweets;
};

module.exports = downloadThread;
