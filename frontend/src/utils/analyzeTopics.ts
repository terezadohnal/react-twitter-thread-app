import axios from "axios";
import { Topics } from "../models/topics";
import { Reply } from "../models/tweet";

const analyzeTopics = async (replies: Reply[]) => {
  const text = replies.map((reply) => reply.clearedTweet).join(" ");
  const response = await axios.post<Topics>("/topics", { text });
  const { data } = response;
  return data;
};

export default analyzeTopics;
