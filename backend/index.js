require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const port = 4000;
const downloadThread = require("./utils/downloadThread");

app.get("/conversation/:id", async (req, res) => {
  const { id } = req.params;
  const tweets = await downloadThread(id);
  res.send(tweets);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
