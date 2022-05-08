import { UserHeroProps } from "./types";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const UserHero = ({ user }: UserHeroProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar>{user.username.substring(0, 1).toUpperCase()}</Avatar>
      <Typography variant="h6" component="h6">
        {user.name}
      </Typography>
    </Stack>
  );
};

export default UserHero;
