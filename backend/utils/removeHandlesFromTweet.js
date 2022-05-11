const removeHandlesFromTweet = (tweet) => {
  const words = tweet.split(' ');
  if (!words.length) {
    return tweet;
  }

  const removedWords = words.filter((word) => {
    if (typeof word !== 'string') {
      return false;
    }

    return !(word.split('')[0] === '@');
  });

  return removedWords.join(' ');
};

module.exports = removeHandlesFromTweet;
