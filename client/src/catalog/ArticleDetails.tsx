import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useFetchArticleDetailsQuery } from "./CatalogApi";

export default function ArticleDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetchArticleDetailsQuery(id ? +id : 0);


  return (
    <>
      {isLoading && !data && <div>Loading...</div>}
      {data && (
        <>
          <h1>{data.title} </h1>
          <h2> {data.category} </h2>
          <p>{data.content}</p>
          <Button
            component={Link}
            variant="outlined"
            to={'/catalog'}
          >
            {" "}
            Vrati se nazad
          </Button>
        </>
      )}
    </>
  );
}
