import { Box, Stack, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import useSearchContext from "../context/SearchContext";

export default function FetchError() {
  const { error } = useSearchContext();

  return (
    <Box paddingLeft={{ xs: "10px", md: "30px" }} paddingTop="50px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap="20px"
        padding="10px"
        maxWidth={{ xs: "350px", md: "800px" }}
        minHeight="80px"
        color="text.primary"
        backgroundColor="background.error"
        borderRadius="10px"
      >
        <ReportProblemIcon />
        <Typography fontSize={{ xs: "13px", md: "15px" }} color="text.primary">
          <b>Fetch Error:</b> {error}
        </Typography>
      </Stack>
    </Box>
  );
}
