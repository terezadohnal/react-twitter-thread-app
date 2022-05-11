import { Chip, Stack } from "@mui/material";
import { TopicLineProps } from "./types";

const TopicLine = ({ topic }: TopicLineProps) => {
  return (
    <Stack direction="row" spacing={2}>
      {topic.map((word) => (
        <Chip label={word} key={word} />
      ))}
    </Stack>
  );
};

export default TopicLine;
