import axios from "axios";

export const fetchNews = async (search, page, hitsPerPage, signal) => {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${search}&page=${page}&hitsPerPage=${hitsPerPage}`,
    {
      signal,
    }
  );
  // console.log(response.data);

  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`https://dummyjson.com/users`);
  // console.log(response.data);

  return response.data;
};
