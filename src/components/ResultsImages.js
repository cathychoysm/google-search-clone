import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import useSearchContext from "../context/SearchContext";
import { useState } from "react";
import LoadMore from "./LoadMore";
import FetchError from "./FetchError";

export default function ResultsImages() {
  const { isLoading, error, searchResult } = useSearchContext();
  const [isOpen, setIsOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(null);

  const InfoCard = () => {
    const theme = useTheme();
    return (
      <>
        <Box
          width="100%"
          height="100%"
          position="fixed"
          top="0"
          left="0"
          visibility={{ md: "hidden" }}
          zIndex={999}
          backgroundColor="#000000DE"
        />
        <Stack
          sx={{
            position: { xs: "fixed", md: "sticky" },
            top: { xs: "200px", md: "20px" },
            left: "10px",
            zIndex: 1000,
          }}
          direction="column"
          height={{ xs: "400px", md: "500px" }}
          width={{ xs: "calc(100% - 20px)", md: "400px" }}
          borderRadius="10px"
          boxShadow={`0 2px 12px 0 ${theme.palette.background.img_hover}`}
          marginLeft={{ md: "20px" }}
          backgroundColor="background.infocard"
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            height="50px"
            paddingX="10px"
          >
            <IconButton
              disabled={cardIndex < 1 ? true : false}
              onClick={() => {
                setCardIndex((prevIndex) => prevIndex - 1);
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              disabled={cardIndex < searchResult.length - 1 ? false : true}
              onClick={() => {
                setCardIndex((prevIndex) => prevIndex + 1);
              }}
            >
              <ChevronRightIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Link
            href={
              searchResult[cardIndex].image.hasOwnProperty("contextLink")
                ? searchResult[cardIndex].image.contextLink
                : searchResult[cardIndex].link
            }
            target="_blank"
            rel="noopener"
            alignSelf="center"
          >
            <Box
              component="img"
              alt={searchResult[cardIndex].title}
              src={searchResult[cardIndex].link}
              backgroundColor="#FFF"
              width={{ xs: "300px", md: "400px" }}
              maxHeight={{ xs: "250px", md: "350px" }}
              sx={{ objectFit: "contain" }}
            />
          </Link>
          <Stack direction="row" justifyContent="space-between" padding="20px">
            <Link
              href={
                searchResult[cardIndex].image.hasOwnProperty("contextLink")
                  ? searchResult[cardIndex].image.contextLink
                  : searchResult[cardIndex].link
              }
              target="_blank"
              rel="noopener"
              underline="hover"
              color="text.primary"
            >
              <Typography fontSize={{ xs: "18px", md: "20px" }}>
                {searchResult[cardIndex].title}
              </Typography>
            </Link>
            <Link
              href={
                searchResult[cardIndex].image.hasOwnProperty("contextLink")
                  ? searchResult[cardIndex].image.contextLink
                  : searchResult[cardIndex].link
              }
              target="_blank"
              rel="noopener"
            >
              <Button variant="blue">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  paddingY="3px"
                >
                  <Typography paddingLeft="9px" color="background.primary">
                    Visit
                  </Typography>
                  <ChevronRightIcon color="background.primary" />
                </Stack>
              </Button>
            </Link>
          </Stack>
        </Stack>
      </>
    );
  };

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  } else if (error) {
    return <FetchError />;
  }

  return (
    <Stack direction="column" padding="10px 30px">
      <Stack direction="row">
        <Stack
          order={{ xs: 1, md: 0 }}
          direction="row"
          gap="25px"
          justifyContent="flex-start"
          padding={{ xs: "15px", md: "30px" }}
          flexWrap="wrap"
        >
          {searchResult &&
            searchResult.resultType === "image" &&
            searchResult.result.map((item, index) => {
              const contextLink =
                item.image.contextLink ?? false
                  ? item.image.contextLink
                  : item.link;
              return (
                <Stack key={item.link} direction="column" gap="10px">
                  <Button
                    variant="image"
                    onClick={() => {
                      setCardIndex(index);
                      index !== cardIndex
                        ? setIsOpen(true)
                        : setIsOpen((prevState) => !prevState);
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      height={{ xs: "100px", md: "200px" }}
                      borderRadius="10px"
                      overflow="hidden"
                      sx={{ backgroundColor: "background.img" }}
                    >
                      <Box
                        component="img"
                        src={item.link}
                        alt={item.title}
                        minWidth={{ xs: "80px", md: "160px" }}
                        maxWidth={{ xs: "200px", md: "300px" }}
                        maxHeight={{ xs: "100px", md: "200px" }}
                        backgroundColor="#FFF"
                        sx={{
                          objectFit: "contain",
                        }}
                      />
                    </Stack>
                  </Button>
                  <Stack direction="row">
                    <Link
                      href={contextLink}
                      underline="hover"
                      flex="1"
                      width="0px"
                    >
                      <Typography variant="searchContent">
                        {item.title}
                      </Typography>
                    </Link>
                  </Stack>
                </Stack>
              );
            })}
        </Stack>
        {isOpen && (
          <Box>
            <InfoCard />
          </Box>
        )}
      </Stack>
      <Box>
        <LoadMore />
      </Box>
    </Stack>
  );
}
