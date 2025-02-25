import "../../styles/App.css";
import ArticleList from "./ArticleList";
import { useFetchArticlesQuery, useFetchFiltersQuery } from "./CatalogApi";
import { Grid2 } from "@mui/material";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../store/store";
import AppPagination from "../components/AppPagination";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  //moramo dobaviti articleParams iz nase store, da proslijedimo
  const articleParams = useAppSelector((state) => state.catalog);

  const { data, isLoading } = useFetchArticlesQuery(articleParams);
  const { data: filtersData, isLoading: filtersLoading } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  if (isLoading || !data || !filtersData || filtersLoading)
    return <div>Loading....</div>;
  return (
    <>
      <Grid2 container spacing={4} sx={{ p: 2 }}>
        <Grid2>
          <Filters categories={filtersData} />
        </Grid2>

        <Grid2 size={9}>
          <AppPagination 
            metadata={data.pagination}
            onPageChange={(page: number) => {
              dispatch(setPageNumber(page));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <ArticleList articles={data.items}  />
        </Grid2>
      </Grid2>
    </>
  );
}