const functions = require("firebase-functions/v2");
const {defineSecret} = require("firebase-functions/params");

const apiKey = defineSecret("API_KEY");
const searchEngineKey = defineSecret("SEARCH_ENGINE_KEY");

exports.searchAPI = functions.https.onRequest(
    {secrets: [apiKey, searchEngineKey],
      cors: [
        /search-clone-69618\.web\.app$/,
        /search-clone-69618\.firebaseapp\.com$/]},
    async (request, response) => {
      const searchType = request.query.searchType;
      const searchQuery = request.query.searchQuery;
      const startIndex = request.query.startIndex ?? 1;
      const searchTypeSpecified =
        searchType === "image" ? "&searchType=image" : "";
      const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey.value()}&cx=${searchEngineKey.value()}&q=${searchQuery}${searchTypeSpecified}&start=${startIndex}&safe=active`;
      try {
        const result = await fetch(apiUrl).then((response) => response.json());
        response.json(result);
      } catch (err) {
        response.json(err);
      }
    },
);
