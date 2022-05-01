import axios, { AxiosResponse } from "axios";
import { Tweet } from "../models/tweet";

const downloadTweet = async (id: string) => {
  const response = await axios.get<Tweet[]>(`/tweet/${id}`);
  const { data } = response;
  return data;
};

export default downloadTweet;
