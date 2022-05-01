const removeAccentsFromTweet = (tweet) => {
  return tweet.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

module.exports = removeAccentsFromTweet;
