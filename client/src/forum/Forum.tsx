import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetchTopicsQuery, useCreateTopicMutation } from "./forumApi";
import "../../styles/welcome.css";
import { useAppDispatch, useAppSelector } from "../store/store";
import AppPagination from "../components/AppPagination";
import { setPageNumber, setPageSize } from "./forumSlice";
import MySearch from "../catalog/Search";

export default function Forum() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const forumParams = useAppSelector((state) => state.forum);
  useEffect(() => {
    dispatch(setPageSize(3));
  }, [dispatch]);
  const { data, isLoading, error, refetch } = useFetchTopicsQuery(forumParams);
  console.log(data);
  const [createTopic] = useCreateTopicMutation();
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCreateTopic = async () => {
    if (!newTopicTitle.trim()) return;

    try {
      await createTopic({ title: newTopicTitle }).unwrap();
      setNewTopicTitle("");
      setShowForm(false);
      refetch(); // Osvežavamo listu tema nakon dodavanja nove
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
    <Box
      sx={{
        width: "100%",
        p: 1,
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url('background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt:"px" }}
      >
        <MySearch type="forum" />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "black",
            fontWeight: "bold",
            fontStyle: "italic",
            fontFamily: "Arial, sans-serif",
            mt: "12px",
          }}
        >
          Dobrodošli na forum za diskusiju
          <Divider />
        </Typography>
        {data?.pagination && (
          <AppPagination
            metadata={data.pagination}
            onPageChange={(page: number) => dispatch(setPageNumber(page))}
          />
        )}
      </Box>
      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => navigate("/homepage")}
      >
        Napusti forum
      </Button>

      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => setShowForm(!showForm)}
      >
        Dodaj temu
      </Button>

      {/* Forma za unos nove teme */}
      {showForm && (
        <Box sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <TextField
            fullWidth
            label="Naslov teme"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleCreateTopic}>
            Potvrdi unos
          </Button>
        </Box>
      )}

      {data?.topics?.map((topic) => {
        return (
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
                overflow: "hidden", // Prekida prikazivanje teksta koji izlazi izvan kartice
              }}
            >
              <Typography
                fontSize={16}
                marginBottom={1}
                align="center"
                sx={{
                  overflow: "hidden", // Skratiti ako je predug
                  textOverflow: "ellipsis", // Obezbeđuje da se tekst skraćuje sa elipsom
                  width: "100%",
                  textAlign: "center",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 4, // Ograniči broj linija
                  fontWeight: "bold",
                }}
              >
                {topic.title}
              </Typography>

              <Typography
                fontSize={12}
                color="textSecondary"
                align="center"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, // Ograniči broj linija
                  overflow: "hidden",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Autor: {topic.user?.firstName} {topic.user?.lastName} | Datum:{" "}
                {new Date(topic.createdAt).toLocaleDateString()}
              </Typography>
              <Typography
                fontSize={12}
                color="textSecondary"
                align="center"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, // Ograniči broj linija
                  overflow: "hidden",
                  width: "100%",
                  textAlign: "center",
                }}
              >
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
        );
      })}
    </Box>
  );
}
