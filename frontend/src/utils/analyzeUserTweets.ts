import axios from "axios";
import { TopicsResponse } from "../models/topics";

interface AnalyzeUserTweets {
  ids: string[];
}

const analyzeUserTweets = async ({ ids }: AnalyzeUserTweets) => {
  const response = await axios.post<TopicsResponse>("/user/analyze", { ids });
  const { data } = response;
  return data;
};

export default analyzeUserTweets;
