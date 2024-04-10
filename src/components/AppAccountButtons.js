import { Box, IconButton, Tooltip } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AppAccountButtons() {
  return (
    <Box>
      <Tooltip title={"Currently unavailable"} arrow>
        <IconButton sx={{ marginLeft: 1 }}>
          <AppsIcon sx={{ color: "text.icon", fontSize: { xs: 20, md: 28 } }} />
        </IconButton>
      </Tooltip>
      <Tooltip title={"Currently unavailable"} placement="bottom-end" arrow>
        <IconButton>
          <AccountCircleIcon
            sx={{ color: "text.icon", fontSize: { xs: 30, md: 40 } }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
