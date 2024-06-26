import { Button, CircularProgress, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSearchContext from "../context/SearchContext";
import { useState } from "react";

export default function LoadMore() {
  const { apiUrl, setSearchResult, setError } = useSearchContext();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [startIndex, setStartIndex] = useState(11);

  const handleClick = async () => {
    setIsLoadingMore(true);
    try {
      const result = await fetch(`${apiUrl}&startIndex=${startIndex}`).then(
        (response) => response.json()
      );
      if (result.hasOwnProperty("items")) {
        setSearchResult((prevItems) => {
          return {
            resultType: prevItems.resultType,
            result: prevItems.result.concat(result.items),
          };
        });
        setError(null);
      } else if (result.error.code === 429) {
        setError(
          "Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'customsearch.googleapis.com'"
        );
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingMore(false);
      setStartIndex((prevIndex) => prevIndex + 10);
    }
  };

  return (
    <Divider
      sx={{
        margin: {
          xs: "20px 10px 20px 10px",
          md: "30px 20px 30px 20px",
        },
      }}
    >
      {startIndex < 40 ? (
        <Button
          variant="more"
          endIcon={
            isLoadingMore ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "text.primary",
                  marginLeft: "5px",
                }}
              />
            ) : (
              <ExpandMoreIcon />
            )
          }
          onClick={() => {
            handleClick();
          }}
        >
          More results
        </Button>
      ) : (
        `You've reached the maximum of 50 results.`
      )}
    </Divider>
  );
}
