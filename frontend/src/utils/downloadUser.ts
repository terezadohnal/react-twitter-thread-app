import axios from "axios";
import { UserResponse } from "../models/user";

interface DownloadUser {
  username: string;
}

const downloadUser = async ({ username }: DownloadUser) => {
  const response = await axios.get<UserResponse>(`/user/${username}`);
  const { data } = response;
  return data;
};

export default downloadUser;
