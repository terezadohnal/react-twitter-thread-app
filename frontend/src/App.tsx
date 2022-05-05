import "./App.css";
import { FormEvent, useState } from "react";
import dowloadThread from "./utils/downloadThread";
import downloadTweet from "./utils/dowloadTweet";
import analyzeTopics from "./utils/analyzeTopics";
import { Tweet, Reply } from "./models/tweet";
import { Topics } from "./models/topics";

function App() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [lemmaTopics, setLemmaTopics] = useState<Topics>([]);
  const [clearedTopics, setClearedTopics] = useState<Topics>([]);

  const updateId = (event: FormEvent<HTMLInputElement>) => {
    setId(event.currentTarget.value);
  };

  const downloadData = async () => {
    setLoading(true);
    setTweet(null);
    setReplies([]);
    setLemmaTopics([]);
    setClearedTopics([]);
    const tw = await downloadTweet(id);
    const data = await dowloadThread(id);
    setTweet(tw);
    setReplies(data);
    setLoading(false);
    setId("");
  };

  const handleAnalysis = async () => {
    setLoading(true);
    const { dataLemma, dataCleared } = await analyzeTopics(replies);
    setLemmaTopics(dataLemma);
    setClearedTopics(dataCleared);
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

      <div className="tweets">
        {tweet ? (
          <div className="tweet">
            <h2>Tweet: </h2> <br /> <h3>{tweet.text}</h3>
          </div>
        ) : null}

        {tweet ? (
          <button onClick={handleAnalysis} disabled={loading}>
            {loading ? "Analyzing.." : "Analyze Topics"}
          </button>
        ) : null}

        {tweet && lemmaTopics.length ? (
          <div className="topics">
            <h5>Lemma tweets</h5>
            {lemmaTopics.map((topic) => (
              <p key={topic.join(" ")}>{topic.join(", ")}</p>
            ))}
          </div>
        ) : null}

        {tweet && clearedTopics.length ? (
          <div className="topics">
            <h5>Cleared Tweets</h5>
            {clearedTopics.map((topic) => (
              <p key={topic.join(" ")}>{topic.join(", ")}</p>
            ))}
          </div>
        ) : null}

        {replies.length ? (
          <>
            <h2>Replies:</h2>
            {replies.map((reply) => (
              <div key={reply.id} className="reply">
                <h5>Puvodni:</h5>
                <p> {reply.text}</p>
                <h5>Upraveny:</h5>
                <p> {reply.clearedTweet}</p>
                {reply.lemma ? (
                  <>
                    <h5>Lemma:</h5>
                    <p> {reply.lemma}</p>
                  </>
                ) : null}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;

// button "Analyzovat tema"
// -> napojit funkce "handleAnalysis"
//   -> state, kdy se stahuji data z API (ten co uz mam)
//   -> volam funkci "analyzeTopics"
//     -> vlozim do ni pole replies
//     -> uvnitr funkce vytvorim string a zavolam endpoint
