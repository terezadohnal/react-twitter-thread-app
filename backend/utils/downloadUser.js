const axios = require("axios");

const downloadUser = async (username) => {
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          // Authorization: `Bearer ${process.env.token}`,
          Authorization: `Bearer ${process.env["API_TOKEN"]}`,
        },
      }
    );

    const { data } = response;
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = downloadUser;
