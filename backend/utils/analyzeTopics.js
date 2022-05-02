const axios = require("axios");

const analyzeTopics = async (text) => {
  try {
    const response = await axios.post(
      "https://mta.pef.mendelu.cz/tools/cs/lda",
      {
        meta: { n_components: 5, n_top_words: 5 },
        payload: {
          text,
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
