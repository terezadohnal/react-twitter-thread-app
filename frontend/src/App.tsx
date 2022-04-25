import "./App.css";
import { FormEvent, useState } from "react";
import dowloadThread from "./utils/downloadThread";
import { Tweet } from "./models/tweet";

function App() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const updateId = (event: FormEvent<HTMLInputElement>) => {
    setId(event.currentTarget.value);
  };

  const downloadData = async () => {
    setLoading(true);
    const data = await dowloadThread(id);
    setTweets(data);
    setLoading(false);
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
      {tweets.length ? <h2>Tweets:</h2> : null}
      <>
        {tweets.map((tweet) => (
          <p>{tweet.text}</p>
        ))}
      </>
    </div>
  );
}

export default App;
