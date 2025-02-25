import { DateRange, Delete, Email } from "@mui/icons-material";
import {
  TableContainer,
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
  console.log(data);
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
  };
  if (addMode) {
    {
    }
    return (
      <UserForm onCancel={() => setAddMode(false)} onSuccess={handleSuccess} />
    );
  }
  return (
    <>
      <Box>
        <Button
          sx={{
            marginTop: "20px",
            marginLeft: "6%",
            color: "white",
            backgroundColor: "black",
          }}
          size="large"
          variant="contained"
          onClick={() => setAddMode(true)}
        >
          Dodaj novog korisnika
        </Button>
      </Box>
      <TableContainer>
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
            <TableRow
              sx={{
                borderBottom: "2px solid black", // Dodaj border samo na donji deo prvog reda (header)
              }}
            >
              
              <TableCell align="center">Ime </TableCell>
              <TableCell align="center">Prezime</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Pol</TableCell>
              <TableCell align="center">Datum rođenja</TableCell>
              <TableCell align="center">Uloge</TableCell>
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
                    maxWidth: "50px",
                    height: "50px",
                    borderBottom: "none",
                    textAlign: "center", // Centriranje po horizontali
                    verticalAlign: "middle",
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
                    borderBottom: "none",
                    textAlign: "center", // Centriranje po horizontali
                    verticalAlign: "middle",
                  }}
                >
                  {item.lastName}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "230px",
                    whiteSpace: "normal",
                    borderBottom: "none",
                    textAlign: "center", // Centriranje po horizontali
                    verticalAlign: "middle",
                  }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <Email sx={{ marginRight: 1 }} />
                    {item.email}
                  </div>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "70px",
                    whiteSpace: "normal",
                    borderBottom: "none",
                    textAlign: "center", // Centriranje po horizontali
                    verticalAlign: "middle",
                  }}
                >
                  {item.gender}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "80px",
                    whiteSpace: "normal",
                    borderBottom: "none",
                    textAlign: "center", // Centriranje po horizontali
                    verticalAlign: "middle",
                  }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <DateRange sx={{ marginRight: 1 }} />
                    {new Date(item.dateOfBirth).toLocaleDateString()}
                  </div>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    maxWidth: "70px",
                    whiteSpace: "normal",
                    borderBottom: "none",
                    textAlign: "center", // Centriranje po horizontali
                    verticalAlign: "middle",
                  }}
                >
                  {item.roles.join(",  ")}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    maxWidth: "60px",
                    height: "50px",
                    borderBottom: "none",
                    textAlign: "center", // Centriranje po horizontali
                    verticalAlign: "middle",
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
