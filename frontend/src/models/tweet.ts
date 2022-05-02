export interface Tweet {
  id: string;
  text: string;
}

export interface Reply extends Tweet {
  clearedTweet: string;
}
