import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useThemeContext from "../context/ThemeContext";

export default function ChangeThemeButton() {
  const { mode, setMode } = useThemeContext();

  return (
    <IconButton
      sx={{
        width: {
          xs: "25px",
          md: "45px",
        },
        height: {
          xs: "25px",
          md: "45px",
        },
      }}
      onClick={() => {
        setMode((preValue) => (preValue === "light" ? "dark" : "light"));
      }}
    >
      {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
