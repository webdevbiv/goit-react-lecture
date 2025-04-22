import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { fetchNews } from "./services/api";

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
      <ul>
        {news.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
