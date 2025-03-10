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
  Typography,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useFetchUsersQuery,
  useDeleteUserMutation,
} from "../account/accountApi";
import { useAppSelector } from "../store/store";
import UserForm from "./UserForm";
import { resetSearchTerm, setPageNumber } from "../account/userSlice";
import { useDispatch } from "react-redux";
import AppPagination from "../components/AppPagination";

export default function UsersInventory() {
  const userParams = useAppSelector((state) => state.users);

  const { data, isLoading, refetch } = useFetchUsersQuery(userParams);
  console.log(data);
  const [deleteUser] = useDeleteUserMutation();
  const [addMode, setAddMode] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSearchTerm()); // Reset pretrage pri učitavanju stranice
  }, [dispatch]);
  if (isLoading) return <Typography>Loading....</Typography>;

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

  if (addMode) {
    return (
      <UserForm onCancel={() => setAddMode(false)} onSuccess={handleSuccess} />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "10px",
        }}
      >
        {/* Grupisanje pretrage i dugmeta */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button
            sx={{
              color: "white",
              backgroundColor: "black",
              whiteSpace: "nowrap",
              padding: "6px 12px",
              minWidth: "auto",
              fontSize: "14px",
              marginLeft: "70px",
            }}
            size="small"
            variant="contained"
            onClick={() => setAddMode(true)}
          >
            Dodaj korisnika
          </Button>
        </Box>

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
            margin: "0 auto",
            marginTop: "1%",
            borderCollapse: "collapse",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ borderBottom: "4px solid rgba(0, 0, 0, 0.6)" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}></TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                IME
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                PREZIME
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                E-MAIL
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                POL
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                DATUM ROĐENJA
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ULOGE
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nema korisnika koji odgovaraju pretrazi.
                </TableCell>
              </TableRow>
            ) : (
              users.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.6)" }}
                >
                  <TableCell align="center">
                    {" "}
                    <Avatar
                      src={item.profilePicture}
                      sx={{
                        width: 40,
                        height: 40,
                        border: "4px solid white",
                        boxShadow: 2,
                        cursor: "pointer",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.firstName}</TableCell>
                  <TableCell align="center">{item.lastName}</TableCell>
                  <TableCell align="center">
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px", // Razmak između ikone i emaila
      marginLeft: "15px", // Pomera ikonicu i email 15px od početka kolone
    }}
  >
    <Email />
    <span>{item.email}</span>
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
                      startIcon={
                        <Delete
                          sx={{
                            fontSize: 40,
                            width: 24,
                            height: 24,
                            transform: "scale(1.5)",
                          }}
                        />
                      }
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
    </div>
  );
}
