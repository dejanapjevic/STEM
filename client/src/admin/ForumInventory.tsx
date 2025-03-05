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
import MySearch from "../catalog/Search";

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
  console.log(data);
  
  if (isLoading || !data) return <div>Loading....</div>;

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
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Poravnava elemente vertikalno
    width: "100%", // Osigurava da div zauzme celu širinu
    padding: "10px",
  }}
>
  <MySearch type="forum" />
  <div style={{ marginLeft: "auto" }}>
    <AppPagination
      metadata={data.pagination}
      onPageChange={(page: number) => dispatch(setPageNumber(page))}
    />
  </div>
</div>


      
      <Table
        sx={{
          minWidth: 650,
          mb: "1%",
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
            <TableCell align="center" sx={{ fontWeight: "bold" }}>TEMA</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>AUTOR</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>DATUM</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.topics.map((item) => (
            <TableRow key={item.id} sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.6)" }}>
              <TableCell
                align="center"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                  fontWeight: "bold",
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  <QuestionAnswer sx={{ marginRight: 1 }} />
                  {item.title}
                </div>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {item.user?.firstName} {item.user?.lastName}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
  <Button
    startIcon={
      <Delete sx={{ fontSize: 40, width: 24, height: 24,transform: "scale(1.5)" }} />
    }
    color="error"
    onClick={() => handleDeleteTopic(item.id)}
  />
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
