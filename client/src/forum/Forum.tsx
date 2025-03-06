import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetchTopicsQuery, useCreateTopicMutation } from "./forumApi";
import { useAppDispatch, useAppSelector } from "../store/store";
import AppPagination from "../components/AppPagination";
import { setPageNumber, setPageSize } from "./forumSlice";

export default function Forum() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const forumParams = useAppSelector((state) => state.forum);

  useEffect(() => {
    dispatch(setPageSize(3));
  }, [dispatch]);

  const { data, isLoading, error, refetch } = useFetchTopicsQuery(forumParams);
  const [createTopic] = useCreateTopicMutation();
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreateTopic = async () => {
    if (!newTopicTitle.trim()) return;

    try {
      await createTopic({ title: newTopicTitle }).unwrap();
      setNewTopicTitle("");
      setOpenDialog(false);
      refetch();
    } catch (error) {
      console.error("Greška prilikom kreiranja teme", error);
    }
  };

  const viewTopicDetails = (topicId: number) => {
    navigate(`/tema/${topicId}`);
  };

  if (isLoading) return <Typography>Učitavanje tema...</Typography>;
  if (error)
    return <Typography>Došlo je do greške pri učitavanju podataka.</Typography>;

  return (
    <Box sx={{ width: "100%", p: 1, minHeight: "100vh" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Button
        variant="contained"
        sx={{ m: 1, ml:2.5 }}
        onClick={() => setOpenDialog(true)}
      >
        Dodaj temu
      </Button>
        {data?.pagination && (
          <AppPagination
            metadata={data.pagination}
            onPageChange={(page: number) => dispatch(setPageNumber(page))}
          />
        )}
      </Box>

      

      {/* Dialog za unos nove teme */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Dodaj novu temu</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="standard"
            label="Naslov teme"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Otkaži</Button>
          <Button variant="contained" onClick={handleCreateTopic}>
            Potvrdi
          </Button>
        </DialogActions>
      </Dialog>

      {data?.topics?.map((topic) => (
        <Card
          key={topic.id}
          sx={{ animation: "appear 1.2s ease-out", height: 160, margin: 2 }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography
              fontSize={16}
              marginBottom={1}
              align="center"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: "center",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
                fontWeight: "bold",
              }}
            >
              {topic.title}
            </Typography>

            <Typography fontSize={12} color="textSecondary" align="center">
              Autor: {topic.user?.firstName} {topic.user?.lastName} | Datum:{" "}
              {new Date(topic.createdAt).toLocaleDateString()}
            </Typography>
            <Typography fontSize={12} color="textSecondary" align="center">
              Broj odgovora: {topic.replyCount}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => viewTopicDetails(topic.id)}
            >
              Odgovori
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
