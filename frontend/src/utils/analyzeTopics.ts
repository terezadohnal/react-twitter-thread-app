import axios from "axios";
import { Topics } from "../models/topics";
import { Reply } from "../models/tweet";

const analyzeTopics = async (replies: Reply[]) => {
  const text = replies
    .map((reply) => reply.lemma || reply.clearedTweet)
    .join(". ");
  const textCleared = replies.map((reply) => reply.clearedTweet).join(". ");
  const responseLemma = await axios.post<Topics>("/topics", { text });
  const responseCleared = await axios.post<Topics>("/topics", {
    text: textCleared,
  });

  const dataLemma = responseLemma.data;
  const dataCleared = responseCleared.data;
  return { dataLemma, dataCleared };
};

export default analyzeTopics;
