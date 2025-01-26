import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

import HeaderLoggedIn from "../features/logged_in/HeaderLoggedIn";
import { useFetchArticleDetailsQuery } from "./CatalogApi";


export default function ArticleDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetchArticleDetailsQuery(id ? +id : 0);

  const getRoute = (category: string) => {
    switch (category) {
      case "Tehnologija":
        return "/technology";
      case "Nauka":
        return "/science";
      case "Matematika":
        return "/mathematics";
      case "Inženjerstvo":
        return "/engineering";
      default:
        return "/catalog";
    }
  };
  return (
    <>
      <HeaderLoggedIn></HeaderLoggedIn>
      {isLoading && !data && <div>Loading...</div>}
      {data && (
        <>
          <h1>{data.title} </h1>
          <h2> {data.category} </h2>
          <p>{data.content}</p>
          <Button
            component={Link}
            variant="outlined"
            to={getRoute(data.category)}
          >
            {" "}
            Vrati se nazad
          </Button>
        </>
      )}
    </>
  );
}
