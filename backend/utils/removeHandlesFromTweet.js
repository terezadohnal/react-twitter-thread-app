const removeHandlesFromTweet = (tweet) => {
  const words = tweet.split(" ");
  const removedWords = words.filter((word) => !(word.split("").at(0) === "@"));

  return removedWords.join(" ");
};

module.exports = removeHandlesFromTweet;
