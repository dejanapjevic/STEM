import ArticleList from "../../components/articles/ArticleList";
import "../../../styles/App.css";
import HeaderLoggedIn from "./HeaderLoggedIn";
import { useFetchCategoryArticlesQuery } from "./CatalogApi";

export default function Catalog() {
 
  const type = "Tehnologija";
 const{data, isLoading}=useFetchCategoryArticlesQuery(type);
 
  return (
    <>
    <HeaderLoggedIn></HeaderLoggedIn> 
    {isLoading && !data && (
      <div>Loading...</div>
    )}
    {data && (
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
      <ArticleList articles={data} style={{}} />
    </div>
    )}
    </>
  );
}
