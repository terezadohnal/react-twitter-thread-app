const axios = require("axios");

const lemmaText = async (text) => {
  try {
    const response = await axios.post(
      "https://mta.pef.mendelu.cz/tools/cs/lemma",
      {
        meta: {},
        payload: {
          text,
        },
      }
    );
    const { data } = response;
    const arr = data.payload.lemmatized;
    const lemma = arr
      .filter((word) => !!word.lemma)
      .map((word) => word.lemma)
      .join(" ");
    return lemma;
  } catch (error) {
    console.log(error);
  }
};

module.exports = lemmaText;
