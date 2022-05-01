const axios = require("axios");

const tweetLematization = async (tweet) => {
  try {
    const response = await axios.post(
      "https://mta.pef.mendelu.cz/tools/cs/lemma",
      {
        meta: {},
        payload: {
          text: tweet,
        },
      }
    );
    const { data } = response;
    const arr = data.payload.lemmatized;
    const lemma = arr.map((word) => word.lemma).join(" ");
    return lemma;
  } catch (error) {
    console.log(error);
  }
};

module.exports = tweetLematization;
