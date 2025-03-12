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
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1)), url('background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        {/* Grupisanje pretrage i dugmeta */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            onClick={handleCreateNewArticle}
            sx={{
              color: "white",
              backgroundColor: "black",
              width: "300px",
              marginTop: "6px",
            }}
            size="large"
            variant="contained"
          >
            Kreiraj članak
          </Button>
        </Box>

        {filtersData && (
          <Box marginLeft="auto">
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
          padding: "0 16px",
          margin: "0 auto",
          marginTop: "1%",
          borderCollapse: "collapse",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ borderBottom: "4px solid rgba(0, 0, 0, 0.6)" }}>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              NASLOV
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              KATEGORIJA
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              OPIS
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              SADRŽAJ
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((article) => (
            <TableRow
              key={article.id}
              sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.6)" }}
            >
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
              <TableCell align="center">{article.category}</TableCell>
              <TableCell align="center">{article.description}</TableCell>
              <TableCell
                align="center"
                sx={{
                  maxHeight: "100px",
                  overflowY: "auto",
                  wordBreak: "break-word",
                  verticalAlign: "middle",
                  whiteSpace: "normal",
                }}
              >
                <Box sx={{ maxHeight: "100px", overflowY: "auto" }}>
                  {article.content}
                </Box>
              </TableCell>

              <TableCell align="center">
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
    </div>
  );
}
