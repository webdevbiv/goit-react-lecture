import axios from "axios";

export const fetchNews = async (search, page, signal) => {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${search}&page=${page}`,
    {
      signal,
    }
  );
  console.log(response.data);

  return response.data;
};
