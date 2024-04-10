import { Box, Stack } from "@mui/material";
import Navigation from "./Navigation";
import GoogleIcon from "../images/icon_google.png";
import GoogleIconBnw from "../images/icon_google_bnw.png";
import Search from "./Search";
import Footer from "./Footer";
import useThemeContext from "../context/ThemeContext";

export default function Home() {
  const { mode } = useThemeContext();

  const GoogleIconThemed = mode === "dark" ? GoogleIconBnw : GoogleIcon;

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      height="100vh"
    >
      <Navigation />
      <Box
        component="img"
        alt="Google"
        src={GoogleIconThemed}
        width={{ xs: "200px", md: "300px" }}
        marginTop={{ xs: "150px", md: "250px" }}
      />
      <Search />
      <Footer />
    </Stack>
  );
}
