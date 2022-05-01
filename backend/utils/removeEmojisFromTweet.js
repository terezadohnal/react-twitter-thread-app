const removeEmojisFromTweet = (tweet) => {
  const reg =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

  const words = tweet.split(" ");
  const removedEmojis = words.filter((word) => !reg.test(word));

  return removedEmojis.join(" ");
};

module.exports = removeEmojisFromTweet;
