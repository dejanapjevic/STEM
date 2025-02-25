import { Delete, Quiz } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
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

export default function quizInventory() {
  const { data, isLoading, refetch } = useFetchQuizQuestionsQuery();
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
    refetch(); // Osvježavamo listu pitanja
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
    <>
      <Box>
        <Button
          onClick={handleCreateQuestion}
          sx={{
            marginLeft: "5%",
            marginTop: "2%",
            color: "white",
            backgroundColor: "black",
          }}
          size="large"
          variant="contained"
        >
          Kreiraj pitanje
        </Button>
      </Box>

      <Table
        sx={{
          minWidth: 650,

          maxWidth: "90%",

          padding: "0 16px",
          margin: "0 auto",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Pitanje </TableCell>
            <TableCell align="center">Opcija 1</TableCell>
            <TableCell align="center">Opcija 2</TableCell>
            <TableCell align="center">Opcija 3</TableCell>
            <TableCell align="center">Opcija 4</TableCell>
            <TableCell align="center">Odgovor</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  maxWidth: "170px",
                  height: "50px",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Quiz />
                  {item.title}
                </div>
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  maxWidth: "70px",
                  height: "50px",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                {item.option1}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  maxWidth: "70px",
                  whiteSpace: "normal",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                {item.option2}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  maxWidth: "70px",
                  whiteSpace: "normal",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                {item.option3}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  maxWidth: "70px",
                  whiteSpace: "normal",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                {item.option4}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  maxWidth: "70px",
                  height: "50px",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
                {item.answer}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  maxWidth: "40px",
                  height: "50px",
                  textAlign: "center", // Centriranje po horizontali
                  verticalAlign: "middle",
                }}
              >
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
    </>
  );
}
