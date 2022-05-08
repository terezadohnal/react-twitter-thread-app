import axios from "axios";
import { Topics } from "../models/topics";

interface AnalyzeUserTweets {
  ids: string[];
}

const analyzeUserTweets = async ({ ids }: AnalyzeUserTweets) => {
  const response = await axios.post<Topics>("/user/analyze", { ids });
  const { data } = response;
  return data;
};

export default analyzeUserTweets;
