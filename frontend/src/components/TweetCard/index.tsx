import { TweetCardProps } from "./types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TweetCard = ({ tweet }: TweetCardProps) => {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography>{tweet.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
