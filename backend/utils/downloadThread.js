const downloadTweets = require("./downloadTweets");
const clearTweets = require("../utils/clearTweets");

const downloadThread = async (id) => {
  const tweets = [];

  try {
    const response = await downloadTweets(id);

    if (!response.data) {
      return [];
    }

    tweets.push(...response.data);
    let nextToken = response.meta.next_token;

    while (nextToken) {
      const nextResponse = await downloadTweets(id, nextToken);
      tweets.push(...nextResponse.data);
      nextToken = nextResponse.meta.next_token;
    }

    return !!tweets.length ? clearTweets(tweets) : [];
  } catch (error) {
    console.log(error);

    return !!tweets.length ? clearTweets(tweets) : [];
  }
};

module.exports = downloadThread;
