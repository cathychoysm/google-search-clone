import {
  Link,
  MenuItem,
  MenuList,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Leaf from "../images/leaf.png";
import useThemeContext from "../context/ThemeContext";
import { useState } from "react";
import ChangeThemeButton from "./ChangeThemeButton";

export default function Footer() {
  const theme = useTheme();
  const { mode, setMode } = useThemeContext();
  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Stack
      direction="column"
      backgroundColor="background.footer"
      width="100vw"
      height={{ xs: "200px", md: "155px" }}
    >
      <Typography
        variant="p"
        padding="10px 30px"
        sx={{ borderBottom: "1px solid #DADCE0" }}
      >
        Country
      </Typography>
      <Stack justifyContent="center" padding="15px 10px">
        <Link
          variant="home"
          href="https://sustainability.google"
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          <Stack
            direction="row"
            gap="5px"
            alignItems="center"
            justifyContent="center"
          >
            <img alt="" src={Leaf} />
            <Typography variant="p">
              Our third decade of climate action: join us
            </Typography>
          </Stack>
        </Link>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-around"
        flexWrap="wrap"
        rowGap="0px"
        paddingTop={{ xs: "15px", md: "5px" }}
      >
        <Stack direction="row" gap="30px" alignItems="center">
          <Link
            variant="home"
            href="https://ads.google.com"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            Advertising
          </Link>
          <Link
            variant="home"
            href="https://smallbusiness.withgoogle.com"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            Business
          </Link>
          <Link
            variant="home"
            href="https://www.google.com/search/howsearchworks"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            How Search works
          </Link>
        </Stack>
        <Stack direction="row" gap="30px" alignItems="center">
          <Link
            variant="home"
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            Privacy
          </Link>
          <Link
            variant="home"
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            Terms
          </Link>
          <Typography
            sx={{
              fontSize: { xs: "13px", md: "15px" },
              color: "text.primary",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            onClick={(event) => {
              setOpenPopper((prevState) => !prevState);
              setAnchorEl(anchorEl ? null : event.currentTarget);
            }}
          >
            Settings
          </Typography>
          <ChangeThemeButton />
          <Popper
            open={openPopper}
            anchorEl={anchorEl}
            placement="top-end"
            sx={{
              minWidth: "170px",
              borderRadius: "5px",
              backgroundColor: "background.primary",
              boxShadow: `0 1px 6px 0 ${theme.palette.background.search_bar_shadow_hover}`,
            }}
            modifiers={{
              name: "offset",
              options: {
                offset: [0, 20],
              },
            }}
          >
            <MenuList>
              <MenuItem
                sx={{
                  paddingY: "5px",
                }}
                onClick={() => {
                  setMode((preValue) =>
                    preValue === "light" ? "dark" : "light"
                  );
                }}
              >
                Dark theme: {mode === "dark" ? "On" : "Off"}
              </MenuItem>
            </MenuList>
          </Popper>
        </Stack>
      </Stack>
    </Stack>
  );
}
