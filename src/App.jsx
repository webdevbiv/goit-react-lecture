import { useEffect, useState } from "react";
import { fetchNews } from "./services/api";

import Header from "./components/Header/Header";
import List from "./components/List/List";

import "./App.css";

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Header />
      <List news={news.filter((item) => item.title)} />
    </>
  );
}

export default App;
