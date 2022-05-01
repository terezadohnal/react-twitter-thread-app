const axios = require("axios");

const analyzeTopics = async (tweets) => {
  const clearedTweet = tweets.map((tweet) => tweet.clearedTweet).join(" ");

  try {
    const response = await axios.post(
      "https://mta.pef.mendelu.cz/tools/cs/lda",
      {
        meta: { n_components: 5, n_top_words: 5 },
        payload: {
          text: clearedTweet,
        },
      }
    );

    const { data } = response;
    const topics = data.payload.clusters;
    return topics;
  } catch (error) {
    console.log(error);
  }
};

module.exports = analyzeTopics;
