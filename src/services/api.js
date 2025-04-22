import axios from "axios";

export const fetchNews = async () => {
  const response = await axios.get("https://hn.algolia.com/api/v1/search");

  return response.data.hits;
};
