import { useEffect, useState } from "react";
import { fetchNews } from "./services/api";

import Header from "./components/Header/Header";
import List from "./components/List/List";

import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetchNews(search, page, abortController.signal);
        setNews((prev) => [...prev, ...response.hits]);
        setTotalPages(response.nbPages);
      } catch (error) {
        if (error.name === "CanceledError") return;
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => {
      abortController.abort();
    };
  }, [search, page]);

  const handleSearch = (newSearch) => {
    setNews([]);
    setPage(0);
    setSearch(newSearch);
  };

  return (
    <>
      <Header />
      <SearchBar handleSearch={handleSearch} />
      <List news={news.filter((item) => item.title || item.story_title)} />
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {page < totalPages - 1 && !loading && (
        <button onClick={() => setPage((prev) => prev + 1)}>Load more</button>
      )}
    </>
  );
}

export default App;
