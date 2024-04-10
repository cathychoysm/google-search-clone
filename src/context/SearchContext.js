import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";

const SearchContext = createContext({
  apiUrl: "",
  searchResult: [],
  setSearchResult: () => {},
  isLoading: false,
  error: null,
  setError: () => {},
});

export default function useSearchContext() {
  return useContext(SearchContext);
}

export const SearchContextProvider = ({ children }) => {
  // Get default search params values from path
  const location = useLocation();
  const query = decodeURI(location.pathname.split("/").pop());
  const isImageSearch = useMatch("/results/image/:query");

  // Search params
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchType, setSearchType] = useState(() => {
    return isImageSearch ? "image" : "";
  });
  // const [startIndex, setStartIndex] = useState(1);

  // Loading Status
  const [isLoading, setIsLoading] = useState(true);

  // Search results
  const [searchResult, setSearchResult] = useState({});
  const [error, setError] = useState(null);

  // API URL
  const apiUrl = `https://us-central1-search-clone-69618.cloudfunctions.net/searchAPI?searchQuery=${searchQuery}&searchType=${searchType}`;

  // 1. Use path change to trigger search params state update
  useEffect(() => {
    if (
      searchType !== (isImageSearch ? "image" : "") ||
      searchQuery !== query
    ) {
      setIsLoading(true);
      setSearchType(isImageSearch ? "image" : "");
      setSearchQuery(query);
    }
    // eslint-disable-next-line
  }, [location]);

  // 2. Search params updated and triggered refetch (Full refresh on searchResult)
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(apiUrl).then((response) => response.json());
        console.log(result);
        if (result.hasOwnProperty("items")) {
          setSearchResult({
            resultType: result.queries.request[0].searchType ?? "",
            result: result.items,
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
        setIsLoading(false);
      }
    }

    if (searchQuery !== "") {
      fetchData();
    }
  }, [searchType, searchQuery, apiUrl]);

  return (
    <SearchContext.Provider
      value={{
        apiUrl,
        searchResult,
        setSearchResult,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
