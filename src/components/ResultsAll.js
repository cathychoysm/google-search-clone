import { Box, CircularProgress, Link, Stack, Typography } from "@mui/material";
import useSearchContext from "../context/SearchContext";
import LoadMore from "./LoadMore";
import FetchError from "./FetchError";

export default function ResultsAll() {
  const { isLoading, error, searchResult } = useSearchContext();

  if (isLoading) {
    return (
      <Box paddingLeft={{ xs: "30px", lg: "100px" }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    return <FetchError />;
  }

  return (
    <Stack>
      <Stack
        direction="column"
        gap="45px"
        paddingLeft={{ xs: "30px", lg: "100px" }}
        justifyContent="flex-start"
      >
        {searchResult &&
          searchResult.resultType === "" &&
          searchResult.result.map((item) => {
            const hasImg = (
              item.hasOwnProperty("pagemap")
                ? item.pagemap.hasOwnProperty("metatags")
                : false
            )
              ? item.pagemap.metatags[0]["og:image"] ?? false
              : false;
            return (
              <Box
                sx={{
                  display: "grid",
                  rowGap: { xs: "5px", md: "10px" },
                  columnGap: "30px",
                  gridTemplateRows: {
                    xs: "15px auto 1fr",
                    md: "15px 30px 1fr",
                  },
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "600px 1fr",
                  },
                  gridTemplateAreas: {
                    xs: `"link link"
									"title title"
									"description image"`,
                    md: `"link image"
									"title image"
									"description image"`,
                  },
                  alignItems: "start",
                  justifyItems: "start",
                }}
                key={item.link}
              >
                <Typography
                  gridArea="link"
                  variant="searchContent"
                  maxWidth={{ xs: "400px", md: "600px" }}
                >
                  {item.displayLink}
                </Typography>
                <Link gridArea="title" href={item.link} underline="hover">
                  <Typography
                    variant="searchTitle"
                    maxWidth={{ xs: "400px", md: "600px" }}
                  >
                    {item.title}
                  </Typography>
                </Link>
                <Typography
                  gridArea="description"
                  variant="searchContent"
                  maxWidth={{ xs: "400px", md: "600px" }}
                >
                  <div dangerouslySetInnerHTML={{ __html: item.htmlSnippet }} />
                </Typography>
                {hasImg && (
                  <Box
                    gridArea="image"
                    alignSelf="center"
                    justifySelf={{ xs: "center", md: "start" }}
                    component="img"
                    alt=""
                    src={item.pagemap.metatags[0]["og:image"]}
                    width="100px"
                    height="100px"
                    borderRadius="10px"
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            );
          })}
      </Stack>
      <LoadMore />
    </Stack>
  );
}
