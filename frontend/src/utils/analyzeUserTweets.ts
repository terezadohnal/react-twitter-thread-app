import axios from 'axios';
import { TopicsResponse } from '../models/topics';

interface AnalyzeUserTweets {
  ids: string[];
  username: string;
}

const analyzeUserTweets = async ({ ids, username }: AnalyzeUserTweets) => {
  const response = await axios.post<TopicsResponse>('/user/analyze', {
    ids,
    username,
  });
  const { data } = response;
  return data;
};

export default analyzeUserTweets;
