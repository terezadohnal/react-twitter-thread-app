import axios, { AxiosResponse } from "axios";
import { Reply } from "../models/tweet";

const downloadThread = async (id: string) => {
  const response = await axios.get<Reply[]>(`/conversation/${id}`);
  const { data } = response;
  return data;
};

export default downloadThread;
