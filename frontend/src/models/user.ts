import { Tweet } from "./tweet";

export interface User {
  id: string;
  name: string;
  username: string;
}

export interface UserResponse {
  user: User;
  tweets: Tweet[];
}
