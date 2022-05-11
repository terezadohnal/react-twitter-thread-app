const axios = require('axios');

const removeStopWords = async (text) => {
  try {
    const response = await axios.post(
      'https://mta.pef.mendelu.cz/tools/cs/stopwords',
      {
        payload: {
          text,
        },
      }
    );

    const { data } = response;
    const { stopwords } = data.payload;

    if (!stopwords || !stopwords.length) {
      return text;
    }

    const finalStopWords = [
      ...stopwords,
      ...stopwords.map((word) => `${word},`),
      ...stopwords.map((word) => `${word}.`),
    ];

    const textWithNoStopWords = text
      .split(' ')
      .filter((word) => !finalStopWords.includes(word));

    return textWithNoStopWords.join(' ');
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeStopWords;
