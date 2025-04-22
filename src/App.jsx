import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get("https://hn.algolia.com/api/v1/search")
      .then((res) => console.log(res));
  });
  return (
    <>
      <Header />
    </>
  );
}

export default App;
