import axios, { AxiosResponse } from "axios";
import { Tweet } from "../models/tweet";

const downloadThread = async (id: string) => {
  const response = await axios.get<Tweet[]>(`/conversation/${id}`);
  const { data } = response;
  return data;
};

export default downloadThread;
