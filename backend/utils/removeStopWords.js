const axios = require('axios');
const fs = require('fs');

const removeStopWords = async (text, username) => {
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

    const stopwordsExtended = [
      ...stopwords,
      ...['jo', 'Jo', 'No', 'no', 'At', 'at', 'ne', 'Ne', 'tvl', 'Tvl'],
    ];

    const finalStopWords = [
      ...stopwordsExtended,
      ...stopwordsExtended.map((word) => `${word},`),
      ...stopwordsExtended.map((word) => `${word}.`),
    ];

    const now = new Date().toLocaleTimeString();

    fs.writeFile(
      `${username}-stop-words-${now}.txt`,
      finalStopWords.join(' || '),
      function (err) {
        if (err) return console.log(err);
      }
    );

    const textWithNoStopWords = text
      .split(' ')
      .filter((word) => !finalStopWords.includes(word.trim()));

    return textWithNoStopWords.join(' ');
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeStopWords;
