import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TweetListProps } from "./types";
import TweetCard from "../TweetCard";

const TweetList = ({ tweets }: TweetListProps) => {
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      {tweets.map((tweet) => (
        <TweetCard tweet={tweet} key={tweet.id} />
      ))}
      <Typography>{`Number of tweets: ${tweets.length}`}</Typography>
    </Stack>
  );
};

export default TweetList;
