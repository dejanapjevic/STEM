import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  useFetchArticlesQuery,
  useFetchFiltersQuery,
} from "../catalog/CatalogApi";
import { useAppDispatch, useAppSelector } from "../store/store";
import AppPagination from "../components/AppPagination";
import { setPageNumber } from "../catalog/catalogSlice";
import { useState } from "react";
import ArticleForm from "./ArticleForm";
import { Article } from "../models/article";
import { useDeleteArticleMutation } from "./adminApi";
import { toast } from "react-toastify";

export default function CatalogInventory() {
  const articleParams = useAppSelector((state) => state.catalog);

  const { data, isLoading, refetch } = useFetchArticlesQuery(articleParams);
  //refetch je funkcija koju vraća RTK Query i koristi se za ručno osvježavanje podataka
  const { data: filtersData, isLoading: filtersLoading } =
    useFetchFiltersQuery();
  const [deleteArticle] = useDeleteArticleMutation();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleSelectedArticle = (article: Article) => {
    setSelectedArticle(article);
    setEditMode(true);
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      await deleteArticle(id);
      refetch();
      toast.success("Uspješno ste obrisali članak");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNewArticle = () => {
    setEditMode(true);
    setSelectedArticle(null);
  };

  if (isLoading || !data || !filtersData || filtersLoading)
    return <div>Loading....</div>;
  if (editMode)
    return (
      <ArticleForm
        setEditMode={setEditMode}
        article={selectedArticle}
        refetch={refetch}
        setSelectedArticle={setSelectedArticle}
      />
    );

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={handleCreateNewArticle}
          sx={{ m: 2, color: "white", backgroundColor: "black" }}
          size="large"
          variant="contained"
        >
          Kreiraj članak
        </Button>

        {filtersData && (
          <Box sx={{ pt: 3 }}>
            <AppPagination
              metadata={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
              }}
            />
          </Box>
        )}
      </Box>

      <Table
        sx={{
          minWidth: 650,
          maxWidth: "90%",
          //  border: "none",

          padding: "0 16px",
          margin: "0 auto",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Naslov</TableCell>
            <TableCell align="center">Kategorija</TableCell>
            <TableCell align="center">Opis</TableCell>
            <TableCell align="center">Sadržaj</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((article) => (
            <TableRow key={article.id}>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <Box display="flex" alignItems="center">
                  <img
                    src={article.pictureUrl}
                    alt={article.title}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{article.title}</span>
                </Box>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "50px",
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {article.category}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "400px",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {article.description}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxHeight: "100px",
                  textAlign: "center",
                  overflowY: "auto", // Omogućava vertikalni scroll kada sadržaj premaši visinu ćelije
                  wordBreak: "break-word",
                  verticalAlign: "middle", // Održava centriranje teksta vertikalno
                  whiteSpace: "normal", // Dozvoljava prelamanje teksta
                }}
              >
                <Box sx={{ maxHeight: "100px", overflowY: "auto" }}>
                  {article.content}
                </Box>
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  maxWidth: "30px",
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <Button
                  onClick={() => handleSelectedArticle(article)}
                  startIcon={<Edit />}
                />
                <Button
                  onClick={() => handleDeleteArticle(article.id)}
                  startIcon={<Delete />}
                  color="error"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
