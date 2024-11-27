import { useEffect, useState } from "react";
import ArticleList from "../../components/articles/ArticleList";
import { Article } from "../../article";
import "../../../styles/App.css";
import HeaderLoggedIn from "./HeaderLoggedIn";

export default function Catalog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const type = "Tehnologija";
  useEffect(() => {
    fetch(`http://localhost:5211/api/Articles/type/${type}`)
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  if (articles.length === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
    <HeaderLoggedIn></HeaderLoggedIn> 
    <div
      style={{
        height: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        padding: "2%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ArticleList articles={articles} style={{}} />
    </div>
    </>
  );
}
