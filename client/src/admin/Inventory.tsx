import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom";
import { useDeleteArticleMutation } from "./adminApi";

export default function Inventory() {
  const articleParams = useAppSelector((state) => state.catalog);
  const navigate = useNavigate();
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNewArticle = () => {
    setEditMode(true);
    setSelectedArticle(null); // Ovdje resetuješ selectedArticle na null
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
          // onClick={() => setEditMode(true)}
          onClick={handleCreateNewArticle}
          sx={{ m: 2, color: "white", backgroundColor: "#9C27B0" }}
          size="large"
          variant="contained"
        >
          Kreiraj članak
        </Button>
        <Button onClick={() => navigate("/catalog")} sx={{ color: "#5f4995" }}>
          <ArrowBack sx={{ color: "#5f4995" }} />
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
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            mb: "1%",
            border: "4px solid #9C27B0",
            "& td, & th": { border: "2px solid #9C27B0" },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
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
                  component="th"
                  scope="row"
                  sx={{
                    maxWidth: "50px",
                    height: "50px",
                  }}
                >
                  {article.id}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "230px",
                    whiteSpace: "normal",
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
                  }}
                >
                  {article.category}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "400px",
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
                    verticalAlign: "top", // Bolje je postaviti na "top" za vertikalno poravnanje
                    whiteSpace: "normal", // Prelamanje teksta unutar ćelije
                    display: "block",
                  }}
                >
                  {article.content}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    maxWidth: "30px",
                    height: "50px",
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
      </TableContainer>
    </>
  );
}
