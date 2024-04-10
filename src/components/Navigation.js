import { Link, Stack, Tooltip } from "@mui/material";
import AppAccountButtons from "./AppAccountButtons";

export default function Navigation() {
  return (
    <Stack
      direction="row"
      height="48px"
      width="98vw"
      paddingX="6px"
      paddingY="3px"
      margin={0}
      sx={{ justifyContent: "space-between" }}
    >
      <Stack direction="row">
        <Link
          variant="home"
          href="https://about.google"
          target="_blank"
          rel="noopener"
          underline="hover"
          padding="15px 10px"
        >
          About
        </Link>
        <Link
          variant="home"
          href="https://store.google.com"
          target="_blank"
          rel="noopener"
          underline="hover"
          padding="15px 10px"
        >
          Store
        </Link>
      </Stack>
      <Stack direction="row">
        <Link
          variant="home"
          href="https://mail.google.com"
          target="_blank"
          rel="noopener"
          underline="hover"
          padding="15px 10px"
        >
          Gmail
        </Link>
        <Tooltip title={"Currently unavailable"} arrow>
          <Link variant="home" href="/" underline="hover" padding="15px 10px">
            Images
          </Link>
        </Tooltip>
        <AppAccountButtons />
      </Stack>
    </Stack>
  );
}
