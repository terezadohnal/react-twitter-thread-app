import "./App.css";
import { FormEvent, useState } from "react";
import dowloadThread from "./utils/downloadThread";
import downloadTweet from "./utils/dowloadTweet";
import { Tweet } from "./models/tweet";

function App() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState<Tweet[]>([]);
  const [replies, setReplies] = useState<Tweet[]>([]);

  const updateId = (event: FormEvent<HTMLInputElement>) => {
    setId(event.currentTarget.value);
  };

  const downloadData = async () => {
    setLoading(true);
    const tw = await downloadTweet(id);
    const data = await dowloadThread(id);
    setTweet(tw);
    setReplies(data);
    setLoading(false);
    setId("");
  };

  return (
    <div className="App">
      <h1>Tweet App</h1>
      <input
        type="text"
        value={id}
        onChange={updateId}
        placeholder="Enter ID"
      />
      <button onClick={downloadData} disabled={loading}>
        {loading ? "Downloading.." : "Download Thread"}
      </button>

      <div className="tweets">
        {tweet.length ? (
          <div className="tweet">
            <h2>Tweet: </h2> <br /> <h3>{tweet.at(0)?.text}</h3>
          </div>
        ) : null}
        {replies.length ? <h2>Replies:</h2> : null}
        <>
          {replies.map((tweet) => (
            <p>{tweet.text}</p>
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
