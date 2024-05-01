import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Results from "./components/Results";

import { SearchContextProvider } from "./context/SearchContext";
import useThemeContext from "./context/ThemeContext";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";

function App() {
  const { mode } = useThemeContext();

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            blue: "#8AB4F8",
            text: {
              primary: "#F1F3F4",
              icon: "#FFFFFFDE",
              search_bar: "#E8EAED",
              search_button: "#E8EAED",
              search_title: "#8AB4F8",
              search_content: "#BDC1C6",
              tab_inactive: "#9AA0A6",
            },
            background: {
              default: "#202124",
              primary: "#202124",
              search_bar_border: "#5F6368",
              search_bar_hover: "#303134",
              search_bar_shadow_hover: "#171717",
              search_button: "#303134",
              search_button_border_hover: "#5F6368",
              footer: "#171717",
              loadmore: "#303134",
              loadmore_hover: "#3C4043",
              img: "#28282B",
              img_hover: "#171717",
              infocard: "#171717",
              error: "#A22A2A",
            },
          }
        : {
            blue: "#1A73E8",
            text: {
              primary: "#1F1F1F",
              icon: "#5F6368",
              search_bar: "#000000DE",
              search_button: "#3C4043",
              search_title: "#1A0DAB",
              search_content: "#4D5156",
              tab_inactive: "#70757A",
            },
            background: {
              default: "#FFF",
              primary: "#FFF",
              search_bar_border: "#DFE1E5",
              search_bar_hover: "#FFF",
              search_bar_shadow_hover: "#20212447",
              search_button: "#F8F9FA",
              search_button_border_hover: "#DADCE0",
              footer: "#F2F2F2",
              loadmore: "#F1F3F4",
              loadmore_hover: "#D9D7DC",
              img: "#F8F7F7",
              img_hover: "#0000004D",
              infocard: "#FFF",
              error: "#FCCCCC",
            },
          }),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  theme.components = {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "arial, sans-serif",
          fontSize: "15px",
          color: theme.palette.text.primary,
        },
      },
      variants: [
        {
          props: { variant: "p" },
          style: {
            [theme.breakpoints.up("xs")]: {
              fontSize: "13px",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "15px",
            },
          },
        },
        {
          props: { variant: "searchTitle" },
          style: {
            [theme.breakpoints.up("xs")]: {
              fontSize: "16px",
              textWrap: "wrap",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "24px",
              textWrap: "nowrap",
            },
            fontFamily: "arial, sans-serif",
            fontWeight: 500,
            color: theme.palette.text.search_title,
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        },
        {
          props: { variant: "searchContent" },
          style: {
            [theme.breakpoints.up("xs")]: {
              fontSize: "12px",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "14px",
            },
            fontFamily: "arial, sans-serif",
            color: theme.palette.text.search_content,
            lineHeight: 1.5,
            textWrap: "wrap",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        },
      ],
      defaultProps: {
        variantMapping: {
          searchTitle: "h2",
          searchContent: "p",
        },
      },
    },
    MuiLink: {
      variants: [
        {
          props: { variant: "home" },
          style: {
            [theme.breakpoints.up("xs")]: {
              fontSize: "13px",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "15px",
            },
            fontFamily: "arial, sans-serif",
            color: theme.palette.text.primary,
          },
        },
      ],
    },
    MuiOutlinedInput: {
      variants: [
        {
          props: { variant: "home" },
          style: {
            [theme.breakpoints.up("xs")]: {
              width: "300px",
              height: "40px",
            },
            [theme.breakpoints.up("md")]: {
              width: "600px",
              height: "50px",
            },
            borderRadius: "25px",
            color: theme.palette.text.search_bar,
            backgroundColor: theme.palette.background.search_bar,
            [`.MuiOutlinedInput-notchedOutline`]: {
              borderColor: theme.palette.background.search_bar_border,
            },
            [`&:hover .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "transparent",
            },
            "&:hover": {
              backgroundColor: theme.palette.background.search_bar_hover,
              boxShadow: `0 1px 6px 0 ${theme.palette.background.search_bar_shadow_hover}`,
            },

            [`&.Mui-focused .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "transparent",
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.background.search_bar_hover,
              boxShadow: `0 1px 6px 0 ${theme.palette.background.search_bar_shadow_hover}`,
            },
          },
        },
        {
          props: { variant: "results" },
          style: {
            [theme.breakpoints.up("xs")]: {
              width: "100%",
              height: "40px",
            },
            [theme.breakpoints.up("md")]: {
              width: "600px",
              height: "50px",
            },
            borderRadius: "25px",
            paddingLeft: "20px",
            color: theme.palette.text.search_bar,
            backgroundColor: theme.palette.background.search_bar_hover,
            boxShadow: `0 1px 6px 0 ${theme.palette.background.search_bar_shadow_hover}`,
            [`.MuiOutlinedInput-notchedOutline`]: {
              borderColor: "transparent",
            },
            [`&:hover .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "transparent",
            },
            "&:hover": {
              backgroundColor: theme.palette.background.search_bar_hover,
              boxShadow: `0 2px 8px 1px ${theme.palette.background.search_bar_shadow_hover}`,
            },

            [`&.Mui-focused .MuiOutlinedInput-notchedOutline`]: {
              borderColor: "transparent",
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.background.search_bar_hover,
              boxShadow: `0 2px 8px 1px ${theme.palette.background.search_bar_shadow_hover}`,
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "search" },
          style: {
            textTransform: "none",
            height: "40px",
            width: "fit-content",
            padding: "20px",
            borderRadius: "4px",
            color: theme.palette.text.search_button,
            backgroundColor: theme.palette.background.search_button,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.background.search_button,
            "&:hover": {
              borderColor: theme.palette.background.search_button_border_hover,
            },
          },
        },
        {
          props: { variant: "image" },
          style: {
            height: "fit-content",
            width: "fit-content",
            padding: 0,
            borderRadius: "10px",
            "&:hover": {
              boxShadow: `0 2px 12px 0 ${theme.palette.background.img_hover}`,
            },
          },
        },
        {
          props: { variant: "blue" },
          style: {
            textTransform: "none",
            height: "fit-content",
            width: "fit-content",
            paddingX: "5px",
            paddingY: "3px",
            borderRadius: "50px",
            backgroundColor: theme.palette.blue,
            color: theme.palette.background.primary,
            "&:hover": {
              backgroundColor: theme.palette.blue,
              color: theme.palette.background.primary,
            },
          },
        },
        {
          props: { variant: "more" },
          style: {
            [theme.breakpoints.up("xs")]: {
              fontSize: "13px",
              width: "250px",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "15px",
              width: "300px",
            },
            textTransform: "none",
            padding: "8px",
            borderRadius: "50px",
            backgroundColor: theme.palette.background.loadmore,
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: theme.palette.background.loadmore_hover,
            },
          },
        },
      ],
    },
    MuiTab: {
      styleOverrides: {
        root: {
          [theme.breakpoints.up("xs")]: {
            fontSize: "13px",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "15px",
          },
          color: theme.palette.text.tab_inactive,
          minHeight: "0px",
          minWidth: "0px",
          textTransform: "none",

          [`&.Mui-selected`]: {
            color: theme.palette.blue,
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results/*" element={<Results />} />
        </Routes>
      </SearchContextProvider>
    </ThemeProvider>
  );
}

export default App;
