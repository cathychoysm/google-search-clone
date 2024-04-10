import { Box, Button, FormControl, OutlinedInput, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search() {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  return (
    <form
      onSubmit={() => {
        navigate(`/results/${input}`);
      }}
    >
      <FormControl>
        <Stack direction="column" gap="30px" padding="20px" alignItems="center">
          <OutlinedInput
            variant="home"
            startAdornment={
              <SearchIcon sx={{ color: "#9AA0A6", marginRight: "20px" }} />
            }
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></OutlinedInput>
          <Button
            type="submit"
            onClick={() => {
              navigate(`/results/${input}`);
            }}
            variant="search"
            disableTouchRipple
          >
            Google Search
          </Button>
        </Stack>
      </FormControl>
      <Box height={{ xs: "100px", md: "610px" }}></Box>
    </form>
  );
}
