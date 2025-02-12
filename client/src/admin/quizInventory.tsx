import { Delete, Edit } from "@mui/icons-material";
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

export default function quizInventory() {
  const { data, isLoading, refetch } = useFetchQuizQuestionsQuery();
  console.log(data);
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [addMode, setAddMode] = useState(false);
  const handleDeleteQuestion = async (id: number) => {
    try {
      await deleteQuestion(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateQuestion = () => {
    setAddMode(true);
  };
  if (isLoading || !data) return <div>Loading....</div>;
  if(addMode) {
    return (
      <QuestionForm/>
    )
  }
  return (
    <>
      <Box>
        <Button
          onClick={handleCreateQuestion}
          sx={{ m: 2, color: "white", backgroundColor: "#9C27B0" }}
          size="large"
          variant="contained"
        >
          Kreiraj pitanje
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,

            border: "4px solid #9C27B0",
            "& td, & th": { border: "2px solid #9C27B0" },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
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
                    maxWidth: "100px",
                    height: "50px",
                  }}
                >
                  {item.id}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    maxWidth: "50px",
                    height: "50px",
                  }}
                >
                  {item.title}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    maxWidth: "50px",
                    height: "50px",
                  }}
                >
                  {item.option1}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "230px",
                    whiteSpace: "normal",
                  }}
                >
                  {item.option2}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "70px",
                    whiteSpace: "normal",
                  }}
                >
                  {item.option3}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "80px",
                    whiteSpace: "normal",
                  }}
                >
                  {item.option4}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    maxWidth: "60px",
                    height: "50px",
                  }}
                >
                  {item.answer}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    maxWidth: "60px",
                    height: "50px",
                  }}
                >
                  <Button
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteQuestion(item.id)}
                  />
                  <Button startIcon={<Edit />} color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
