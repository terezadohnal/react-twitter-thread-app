require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const port = 4000;
const downloadThread = require("./utils/downloadThread");
const downloadTweet = require("./utils/downloadTweet");
const analyzeTopics = require("./utils/analyzeTopics");

app.use(express.json());

app.get("/conversation/:id", async (req, res) => {
  const { id } = req.params;
  const tweets = await downloadThread(id);
  res.send(tweets);
});

app.get("/tweet/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await downloadTweet(id);
  res.send(tweet);
});

app.post("/topics", async (req, res) => {
  const { text } = req.body;
  const topics = await analyzeTopics(text);
  res.send(topics);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
