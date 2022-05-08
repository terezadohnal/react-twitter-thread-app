import Stack from "@mui/material/Stack";
import { TweetListProps } from "./types";
import TweetCard from "../TweetCard";

const TweetList = ({ tweets }: TweetListProps) => {
  return (
    <Stack direction="column" alignItems="center" width="100vh" spacing={2}>
      {tweets.map((tweet) => (
        <TweetCard tweet={tweet} key={tweet.id} />
      ))}
    </Stack>
  );
};

export default TweetList;
