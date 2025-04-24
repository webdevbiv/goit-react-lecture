import { useContext, useEffect, useState } from "react";
import { fetchNews } from "./services/api";

import { AuthContext } from "./providers/authProvider";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import List from "./components/List/List";

import toast from "react-hot-toast";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import About from "./pages/About/About";
import Aim from "./pages/About/Aim";
import Team from "./pages/About/Team";
import History from "./pages/About/History";
import Users from "./pages/Users/Users";

function App() {
  const { user, login } = useContext(AuthContext);
  const [userName, setUserName] = useState(``);
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
    setNews([]);
    setPage(0);
  };

  if (!user)
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(userName);
          }}
        >
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    );

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="aim" element={<Aim />} />
          <Route path="team" element={<Team />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
