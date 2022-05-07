const axios = require("axios");

const downloadUserTweets = async (userID) => {
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/${userID}/tweets?expansions=author_id&max_results=20&exclude=replies`,
      {
        headers: {
          // Authorization: `Bearer ${process.env.token}`,
          Authorization: `Bearer ${process.env["API_TOKEN"]}`,
        },
      }
    );

    const { data } = response;
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = downloadUserTweets;
