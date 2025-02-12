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
  useDeleteUserMutation,
  useFetchUsersQuery,
} from "../account/accountApi";
import { toast } from "react-toastify";
import { useState } from "react";
import UserForm from "./UserForm";

export default function UsersInventory() {
  const { data, isLoading, refetch } = useFetchUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [addMode, setAddMode] = useState(false);

  if (isLoading || !data) return <div>Loading....</div>;

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      refetch();
      toast.success("Uspješno ste obrisali korisnika");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSuccess = async () => {
    setAddMode(false);
    refetch();
  }
  if (addMode) {
    return (
      <UserForm
        onCancel={() => setAddMode(false)}
        onSuccess={handleSuccess}
      />
    );
  }
  return (
    <>
      <Box>
        <Button
          sx={{ m: 2, color: "white", backgroundColor: "#9C27B0" }}
          size="large"
          variant="contained"
          onClick={() => setAddMode(true)}
        >
          Dodaj novog korisnika
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
              <TableCell align="center">Ime </TableCell>
              <TableCell align="center">Prezime</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Pol</TableCell>
              <TableCell align="center">Datum rođenja</TableCell>
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
                  {item.firstName}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    maxWidth: "50px",
                    height: "50px",
                  }}
                >
                  {item.lastName}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "230px",
                    whiteSpace: "normal",
                  }}
                >
                  {item.email}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "70px",
                    whiteSpace: "normal",
                  }}
                >
                  {item.gender}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "80px",
                    whiteSpace: "normal",
                  }}
                >
                  {new Date(item.dateOfBirth).toLocaleDateString()}
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
                    onClick={() => {
                      if (item.id) {
                        handleDeleteUser(item.id);
                      } else {
                        console.error("User ID is undefined");
                      }
                    }}
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
