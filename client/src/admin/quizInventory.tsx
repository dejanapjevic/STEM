import { Delete, Quiz } from "@mui/icons-material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import {
  useDeleteQuestionMutation,
  useFetchQuizQuestionsQuery,
} from "../quiz&test/quiz&testApi";
import { useState } from "react";
import QuestionForm from "../quiz&test/QuestionForm";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/store";
import MySearch from "../catalog/Search";
import { setPageNumber } from "../quiz&test/quizSlice";
import AppPagination from "../components/AppPagination";

export default function quizInventory() {
  const dispatch = useAppDispatch();
  const quizParams = useAppSelector((state) => state.quiz);
  const { data, isLoading, refetch } = useFetchQuizQuestionsQuery(quizParams);
  console.log(data);
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [addMode, setAddMode] = useState(false);

  const handleDeleteQuestion = async (id: number) => {
    try {
      await deleteQuestion(id);
      refetch();
      toast.success("Uspješno ste obrisali pitanje");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateQuestion = () => {
    setAddMode(true);
  };

  const handleSuccess = () => {
    setAddMode(false);
    refetch();
  };

  if (isLoading || !data) return <div>Loading....</div>;
  if (addMode) {
    return (
      <QuestionForm
        onCancel={() => setAddMode(false)}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", m: 2, gap: 3 }}>
        <Button
          onClick={handleCreateQuestion}
          sx={{
            color: "white",
            backgroundColor: "black",
          }}
          size="large"
          variant="contained"
        >
          Kreiraj pitanje
        </Button>

        {/* Pomerite paginaciju na desnu stranu */}
        <Box sx={{ ml: "auto" }}>
          <AppPagination
            metadata={data.pagination}
            onPageChange={(page: number) => dispatch(setPageNumber(page))}
          />
        </Box>
      </Box>

      <Table
        sx={{
          minWidth: 650,
          maxWidth: "90%",
          padding: "0 16px",
          margin: "0 auto",

          borderCollapse: "collapse",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ borderBottom: "4px solid rgba(0, 0, 0, 0.6)" }}>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              PITANJE
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              OPCIJA 1
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              OPCIJA 2
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              OPCIJA 3
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              OPCIJA 4
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              ODGOVOR
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.questions?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.6)" }}
            >
              <TableCell align="center">
                <Box display="flex" alignItems="center" gap={2}>
                  <Quiz />
                  {item.title}
                </Box>
              </TableCell>
              <TableCell align="center">{item.option1}</TableCell>
              <TableCell align="center">{item.option2}</TableCell>
              <TableCell align="center">{item.option3}</TableCell>
              <TableCell align="center">{item.option4}</TableCell>
              <TableCell align="center">{item.answer}</TableCell>
              <TableCell align="center">
                <Button
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => handleDeleteQuestion(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
