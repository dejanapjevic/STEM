import "../../../styles/App.css";
import ArticleList from "../../components/articles/ArticleList";
import { useFetchArticlesQuery } from "./CatalogApi";

export default function Catalog() {
  
  const {data, isLoading} = useFetchArticlesQuery();
  
  if(isLoading || !data) return <div>Loading....</div>

  return (
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
      <ArticleList articles={data}  />
    </div>
  );
}
