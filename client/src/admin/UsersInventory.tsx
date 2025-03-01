import { Email, DateRange, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useFetchUsersQuery,
  useDeleteUserMutation,
} from "../account/accountApi";
import { useAppSelector } from "../store/store";
import UserForm from "./UserForm";
import MySearch from "../catalog/Search";
import { resetSearchTerm, setPageNumber } from "../account/userSlice";
import { useDispatch } from "react-redux";
import AppPagination from "../components/AppPagination";

export default function UsersInventory() {
  const userParams = useAppSelector(state=>state.users);

  const { data, isLoading, refetch } = useFetchUsersQuery(userParams);
  const [deleteUser] = useDeleteUserMutation();
  const [addMode, setAddMode] = useState(false);
  const searchTerm = useAppSelector((state) => state.users.searchTerm);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSearchTerm()); // Reset pretrage pri učitavanju stranice
  }, [dispatch]);
  if (isLoading) return <div>Loading....</div>;
  
  

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

  // 🔍 Filtriranje korisnika prema searchTerm
  const users = data?.users || [];
  const filteredUsers =users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roles?.some((role) =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (addMode) {
    return (
      <UserForm onCancel={() => setAddMode(false)} onSuccess={handleSuccess} />
    );
  }

  return (
    <>
    
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px", // Razmak između elemenata
          marginTop: "20px",
          marginLeft: "6%",
        }}
      >
        <Button
          sx={{
            color: "white",
            backgroundColor: "black",
          }}
          size="large"
          variant="contained"
          onClick={() => setAddMode(true)}
        >
          Dodaj novog korisnika
        </Button>
        <MySearch type="users" />
        {data?.pagination && (
  <AppPagination
    metadata={data.pagination}
    onPageChange={(page: number) => dispatch(setPageNumber(page))}
  />
)}

      </Box>

      <TableContainer>
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
            <TableRow
              sx={{
                borderBottom: "2px solid black",
              }}
            >
              <TableCell align="center">Ime</TableCell>
              <TableCell align="center">Prezime</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Pol</TableCell>
              <TableCell align="center">Datum rođenja</TableCell>
              <TableCell align="center">Uloge</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nema korisnika koji odgovaraju pretrazi.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.firstName}</TableCell>
                  <TableCell align="center">{item.lastName}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <Email sx={{ marginRight: 1 }} />
                      {item.email}
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.gender}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <DateRange sx={{ marginRight: 1 }} />
                      {new Date(item.dateOfBirth).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell align="center">{item.roles.join(", ")}</TableCell>
                  <TableCell align="center">
                    <Button
                      startIcon={<Delete />}
                      color="error"
                      onClick={() => item.id && handleDeleteUser(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
