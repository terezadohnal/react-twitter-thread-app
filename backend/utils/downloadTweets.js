const axios = require("axios");

const downloadTweets = async (id, token) => {
  const params = token
    ? {
        query: `conversation_id:${id}`,
        pagination_token: token,
      }
    : {
        query: `conversation_id:${id}`,
      };

  try {
    const response = await axios.get(
      "https://api.twitter.com/2/tweets/search/recent",
      {
        params,
        headers: {
          // Authorization: `Bearer ${process.env.token}`,
          Authorization: `Bearer ${process.env["API_TOKEN"]}`,
        },
      }
    );

    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = downloadTweets;
