import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

import AppPagination from "../components/AppPagination";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  useCreateTutorialMutation,
  useDeleteTutorialMutation,
  useFetchProgressForUserQuery,
  useFetchTutorialsQuery,
  useFetchVideosQuery,
} from "./tutorialApi";
import { setPageNumber } from "./tutorialSlice";
import VideoUpload from "./videoUpload";
import { useUserInfoQuery } from "../account/accountApi";

export default function TutorialInventory() {
  const dispatch = useAppDispatch();
  const [addTutorial] = useCreateTutorialMutation();
  const [deleteTutorial] = useDeleteTutorialMutation();
 

  const tutorialParams = useAppSelector((state) => state.tutorial);
  const {
    data: tutorial,
    isLoading,
    refetch,
  } = useFetchTutorialsQuery(tutorialParams);
  const { data: videos } = useFetchVideosQuery();

  const [open, setOpen] = useState(false);
  const [tutorialData, setTutorialData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const handleDeleteTutorial = async (id: number) => {
    try {
      await deleteTutorial(id);
      refetch();
      toast.success("Uspješno ste obrisali tutorijal");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !tutorial) return <div>Loading....</div>;

  const handleOpen = () => {
    setTutorialData({ name: "", description: "", category: "" }); // Resetuje podatke
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTutorialData({ ...tutorialData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", tutorialData.name);
    formData.append("description", tutorialData.description);
    formData.append("category", tutorialData.category);

    try {
      await addTutorial(formData).unwrap();
      refetch();
      handleClose();
    } catch (error) {
      console.error("Greška pri dodavanju tutorijala:", error);
    }
  };

  return (
    <div
      style={{
        /*  backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1)), url('background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center ", */
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px",
        }}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ marginTop: "15px", backgroundColor: "black" }}
        >
          Dodaj novi tutorijal
        </Button>
        {tutorial?.pagination && (
          <div style={{ marginLeft: "auto", marginTop: "18px" }}>
            <AppPagination
              metadata={tutorial.pagination}
              onPageChange={(page: number) => dispatch(setPageNumber(page))}
            />
          </div>
        )}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Dodaj novi tutorijal</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Naziv"
            name="name"
            value={tutorialData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Opis"
            name="description"
            value={tutorialData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Kategorija"
            name="category"
            value={tutorialData.category}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "black" }}
            variant="contained"
          >
            Otkaži
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ backgroundColor: "black" }}
            variant="contained"
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>

      <Table
        sx={{
          minWidth: 650,
          mb: "1%",
          maxWidth: "90%",
          padding: "0 16px",
          margin: "0 auto",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ borderBottom: "4px solid rgba(0, 0, 0, 0.6)" }}>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              TUTORIJAL
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              OPIS
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              KATEGORIJA
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              VIDEO ZAPISI
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              DODAJ VIDEO
            </TableCell>

            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tutorial?.tutorials.map((item) => (
            <TableRow
              key={item.id}
              sx={{ borderBottom: "2px solid rgba(0, 0, 0, 0.6)" }}
            >
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {item.name}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {" "}
                {item.description}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {" "}
                {item.category}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <Select
                  value=""
                  displayEmpty
                  renderValue={() => "Lista video zapisa"}
                  sx={{
                    minWidth: 200,
                    pointerEvents: "auto",
                    fontWeight: "bold",
                  }}
                  onOpen={(e) => e.stopPropagation()}
                  onClose={(e) => e.stopPropagation()}
                >
                  {videos
                    ?.filter((v) => v.tutorialId === item.id)
                    .map((video) => (
                      <MenuItem key={video.id} value={video.path} disableRipple>
                        {video.title}
                      </MenuItem>
                    ))}
                </Select>
              </TableCell>
              <TableCell align="center">
                <VideoUpload tutorialId={item.id} refetchVideos={refetch} />
              </TableCell>
              <TableCell align="center">
                <Button
                  color="error"
                  onClick={() => handleDeleteTutorial(item.id)}
                >
                  <Delete sx={{ fontSize: 30 }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
