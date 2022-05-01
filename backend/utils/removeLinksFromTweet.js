const removeLinksFromTweet = (tweet) => {
  const words = tweet.split(" ");
  const removedWords = words.filter((word) => !word.includes("http"));

  return removedWords.join(" ");
};

module.exports = removeLinksFromTweet;
