import { Delete, QuestionAnswer } from "@mui/icons-material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import { useDeleteTopicMutation, useFetchTopicsQuery } from "../forum/forumApi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/store";
import AppPagination from "../components/AppPagination";
import { setPageNumber, setPageSize } from "../forum/forumSlice";
import { useEffect } from "react";

export default function ForumInventory() {
  const dispatch = useAppDispatch();
  const forumParams = useAppSelector((state) => state.forum);
  useEffect(() => {
    dispatch(setPageSize(10));
}, [dispatch]);
  const { data, isLoading, refetch } = useFetchTopicsQuery(forumParams);

  const [deleteTopic] = useDeleteTopicMutation();
  const handleDeleteTopic = async (id: number) => {
    try {
      await deleteTopic(id);
      refetch();
      toast.success("Uspješno ste obrisali temu");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading || !data) return <div>Loading....</div>;

  return (
    <>
      <AppPagination
        metadata={data.pagination}
        onPageChange={(page: number) => dispatch(setPageNumber(page))}
      />
      <Table
        sx={{
          minWidth: 650,
          mb: "1%",
          maxWidth: "90%",
          //  border: "none",
          padding: "0 16px",
          margin: "0 auto",
          marginTop: "4%",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Tema</TableCell>
            <TableCell align="center">Autor</TableCell>
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.topics.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  <QuestionAnswer sx={{ marginRight: 1 }} />
                  {item.title}
                </div>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                {item.user?.firstName} {item.user?.lastName}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "30px",
                  height: "50px",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                <Button
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => handleDeleteTopic(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
