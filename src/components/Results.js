import {
  Box,
  IconButton,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import GoogleIcon from "../images/icon_google.png";
import GoogleIconBnw from "../images/icon_google_bnw.png";
import SearchIcon from "@mui/icons-material/Search";
import AppAccountButtons from "./AppAccountButtons";
import ResultsAll from "./ResultsAll";
import ResultsImages from "./ResultsImages";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import useThemeContext from "../context/ThemeContext";
import ChangeThemeButton from "./ChangeThemeButton";

export default function Results() {
  const { mode } = useThemeContext();
  const GoogleIconThemed = mode === "dark" ? GoogleIconBnw : GoogleIcon;

  const location = useLocation();
  const query = decodeURI(location.pathname.split("/").pop());
  const [input, setInput] = useState(query);

  const navigate = useNavigate();
  const isImageSearch = useMatch("/results/image/:query");

  return (
    <Stack direction="column" gap="20px">
      <Box
        sx={{
          display: "grid",
          rowGap: "15px",
          gridTemplateColumns: {
            xs: "1fr 1fr 1fr",
            md: "150px 1fr 200px",
          },
          gridTemplateAreas: {
            xs: `"blank logo utilities"
						"search search search"`,
            md: `"logo search utilities"`,
          },
        }}
        minWidth={{ md: "1200px" }}
        marginX={{ xs: "10px", md: "30px" }}
        marginTop={{ xs: "20px", md: "30px" }}
        alignItems="center"
      >
        <Box
          gridArea="logo"
          component="img"
          alt="Google"
          src={GoogleIconThemed}
          width={100}
          onClick={() => {
            navigate("/");
          }}
          sx={{ objectFit: "contain", cursor: "pointer" }}
        />
        <Box
          component="form"
          gridArea="search"
          onSubmit={(event) => {
            event.preventDefault();
            navigate(`/results${isImageSearch ? "/image" : ""}/${input}`);
          }}
        >
          <OutlinedInput
            variant="results"
            endAdornment={
              <IconButton
                type="submit"
                onClick={() => {
                  navigate(`/results${isImageSearch ? "/image" : ""}/${input}`);
                }}
              >
                <SearchIcon sx={{ color: "#4285F4" }} />
              </IconButton>
            }
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></OutlinedInput>
        </Box>
        <Stack
          gridArea="utilities"
          justifySelf="end"
          direction="row"
          alignItems="center"
        >
          <ChangeThemeButton />
          <AppAccountButtons />
        </Stack>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={isImageSearch ? true : false}
          aria-label="search type tabs"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "blue",
              height: "3px",
            },
          }}
          sx={{
            marginX: "20px",
            minHeight: "0px",
          }}
        >
          <Tab
            value={false}
            label="All"
            component={Link}
            to={`/results/${input}`}
            disableTouchRipple
          />
          <Tab
            value={true}
            label="Images"
            component={Link}
            to={`/results/image/${input}`}
            disableTouchRipple
          />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/:query" element={<ResultsAll />} />
        <Route path="/image/:query" element={<ResultsImages />} />
      </Routes>
    </Stack>
  );
}
