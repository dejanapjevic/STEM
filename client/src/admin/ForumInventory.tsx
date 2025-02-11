import { Delete } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import { useDeleteTopicMutation, useFetchTopicsQuery } from "../forum/forumApi";

export default function ForumInventory() {
  const { data, isLoading, refetch } = useFetchTopicsQuery();

  const [deleteTopic] = useDeleteTopicMutation();
  const handleDeleteTopic = async (id: number) => {
    try {
      await deleteTopic(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading || !data) return <div>Loading....</div>;

  return (
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

            <TableCell align="center">Tema</TableCell>
            <TableCell align="center">Autor</TableCell>
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  maxWidth: "50px",
                  height: "50px",
                }}
              >
                {item.id}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                }}
              >
                {item.title}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                }}
              >
                {item.user?.firstName} {item.user?.lastName}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  maxWidth: "230px",
                  whiteSpace: "normal",
                }}
              >
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  maxWidth: "30px",
                  height: "50px",
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
    </TableContainer>
  );
}
