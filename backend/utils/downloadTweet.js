const axios = require("axios");

const downloadTweet = async (id) => {
  try {
    const response = await axios.get("https://api.twitter.com/2/tweets", {
      params: {
        ids: id,
      },
      headers: {
        // Authorization: `Bearer ${process.env.token}`,
        Authorization: `Bearer ${process.env["API_TOKEN"]}`,
      },
    });

    const { data } = response;

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = downloadTweet;
