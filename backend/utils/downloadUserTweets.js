const axios = require('axios');
const removeLinksFromTweet = require('./removeLinksFromTweet');

const downloadUserTweets = async (userID) => {
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/${userID}/tweets?&max_results=100&exclude=replies,retweets`,
      {
        headers: {
          Authorization: `Bearer ${process.env['API_TOKEN']}`,
        },
      }
    );

    const { data } = response;
    const dataArr = data.data;
    const removedLinks = dataArr.map((tweet) => ({
      ...tweet,
      text: removeLinksFromTweet(tweet.text),
    }));
    return removedLinks;
  } catch (error) {
    console.log(error);
  }
};

module.exports = downloadUserTweets;
