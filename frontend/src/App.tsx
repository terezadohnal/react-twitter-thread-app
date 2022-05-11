import "./App.css";
import { FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TwitterIcon from "@mui/icons-material/Twitter";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import downloadUser from "./utils/downloadUser";
import analyzeUserTweets from "./utils/analyzeUserTweets";
import { User } from "./models/user";
import { Tweet } from "./models/tweet";
import { Topics } from "./models/topics";
import UserHero from "./components/UserHero";
import TweetList from "./components/TweetsList";
import TopicLine from "./components/TopicLine";

function App() {
  const [username, setUsername] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[] | null>(null);
  const [topics, setTopics] = useState<Topics | null>(null);
  const [tweetCount, setTweetCount] = useState<number>(0);

  const updateUsername = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsername(event.currentTarget.value);
  };

  const handleDownloadUser = async () => {
    setUser(null);
    setTweets(null);
    setTopics(null);
    setDownloading(true);
    const response = await downloadUser({ username });
    const { user, tweets } = response;
    setUser(user);
    setTweets(tweets);
    setDownloading(false);
    setUsername("");
  };

  const handleAnalysis = async () => {
    setTopics(null);
    setAnalyzing(true);
    const ids = tweets?.map((tweet) => tweet.id);
    if (ids) {
      const { topics, tweetCount } = await analyzeUserTweets({ ids });
      setTopics(topics);
      setTweetCount(tweetCount);
    }
    setAnalyzing(false);
  };

  return (
    <Container sx={{ padding: 10 }}>
      <Box sx={{ width: 300, margin: "auto", marginBottom: 1 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
            Tweet App
          </Typography>
          <TextField
            required
            id="username"
            label="Username"
            value={username}
            onChange={updateUsername}
            disabled={downloading}
          />
          <Button
            variant="contained"
            disabled={downloading}
            onClick={handleDownloadUser}
            endIcon={<TwitterIcon />}
          >
            {downloading ? "Downloading" : "Download"} tweets
          </Button>
          {downloading ? <LinearProgress /> : null}
          {user ? <UserHero user={user} /> : null}
        </Stack>
      </Box>
      {tweets ? (
        <Stack spacing={2} alignItems="center">
          <TweetList tweets={tweets} />
          <Box>
            <Button
              variant="contained"
              disabled={analyzing}
              onClick={handleAnalysis}
              endIcon={<AnalyticsOutlinedIcon />}
            >
              {analyzing ? "Analyzing.." : "Analyze"}
            </Button>
          </Box>
        </Stack>
      ) : null}
      <Box sx={{ padding: 5 }}>{analyzing ? <LinearProgress /> : null}</Box>

      {topics ? (
        <Stack spacing={2} alignItems="center" padding={5}>
          <Typography variant="h5" component="h5">
            Topics:
          </Typography>
          {topics.map((topic) => (
            <TopicLine topic={topic} key={topic[0]} />
          ))}
          <Typography variant="h5" component="h5">
            Number of analyzed tweets:
          </Typography>
          <Typography variant="h6" component="h6">
            {tweetCount}
          </Typography>
        </Stack>
      ) : null}
    </Container>
  );
}

export default App;
