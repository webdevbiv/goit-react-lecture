import { useEffect, useState } from "react";
import { fetchNews } from "./services/api";

import Header from "./components/Header/Header";
import List from "./components/List/List";

import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import toast from "react-hot-toast";

function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const [hitsPerPage, setHitsPerPage] = useState(20);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetchNews(
          search,
          page,
          hitsPerPage,
          abortController.signal
        );
        setNews((prev) => [...prev, ...response.hits]);
        setTotalPages(response.nbPages);
      } catch (error) {
        if (error.name === "CanceledError") return;

        setError(true);
        toast.error(`Something went wrong: ${error.message}`);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => {
      abortController.abort();
    };
  }, [search, page, hitsPerPage]);

  const handleSearch = (newSearch) => {
    toast.success(`Searching for "${newSearch}"`);
    setError(false);
    setNews([]);
    setPage(0);
    setSearch(newSearch);
  };

  const handleChangePerPage = (e) => {
    const newHitsPerPage = Number(e.target.value);
    setHitsPerPage(newHitsPerPage);
    setNews((prevNews) =>
      [...prevNews].slice(0, prevNews.length - newHitsPerPage)
    );
  };

  return (
    <>
      <Header />
      <select
        name="hitsPerPage"
        id="hitsPerPage"
        onChange={handleChangePerPage}
        value={hitsPerPage}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
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
