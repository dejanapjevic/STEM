import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import {
  useCreateReplyMutation,
  useFetchTopicDetailsQuery,
  useGetRepliesByTopicQuery,
} from "./forumApi";
import { Reply } from "./reply";

export default function TopicDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchTopicDetailsQuery(id ? +id : 0);
  const {
    data: repliesByTopic,
    isLoading: repliesLoading,
    error: repliesError,
  } = useGetRepliesByTopicQuery(id ? +id : 0);
  console.log(repliesByTopic);
  const [createReply] = useCreateReplyMutation();
  const [newReply, setNewReply] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [prevRepliesCount, setPrevRepliesCount] = useState(0); // Čuvamo prethodan broj odgovora

  // Kada se broj odgovora poveća, zatvaramo formu
  useEffect(() => {
    if (repliesByTopic && repliesByTopic.length > prevRepliesCount) {
      setShowForm(false);
      setPrevRepliesCount(repliesByTopic.length);
    }
  }, [repliesByTopic, prevRepliesCount]);

  const handleCreateReply = async () => {
    if (!newReply.trim()) return;

    try {
      await createReply({ text: newReply, topicId: id ? +id : 0 }).unwrap();
      setNewReply("");
    } catch (error) {
      console.error("Greška prilikom dodavanja odgovora", error);
    }
  };

  if (isLoading || repliesLoading)
    return <Typography>Učitavanje...</Typography>;
  if (error || repliesError || !data)
    return <Typography>Greška pri učitavanju podataka.</Typography>;

  return (
    <Box sx={{ maxWidth: 1600, p: 3 }}>
      <Card
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2, // Blago zaobljeni uglovi
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "center" }}
          >
            Autor: {data.user?.firstName} {data.user?.lastName} | Datum:{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      {showForm && (
        <Box sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <TextField
            fullWidth
            label="Unesi odgovor"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleCreateReply}>
            Potvrdi unos
          </Button>
        </Box>
      )}

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Zatvori formu" : "Dodaj odgovor"}
      </Button>

      <Typography variant="h6">Odgovori:</Typography>

      {repliesByTopic && repliesByTopic.length > 0 ? (
        repliesByTopic.map((reply: Reply) => (
          <Card
            key={reply.id}
            sx={{
              mb: 2,
              p: 2,
              maxWidth: 1400,
              animation: "appear 1.2s ease-out",
              borderRadius: 2, // Blago zaobljeni uglovi
              backgroundColor: "#f9f9f9", // Svetla pozadina
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Blaga senka
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)", // Blago povećanje pri hoveru
                boxShadow: "0 6px 14px rgba(0, 0, 0, 0.15)", // Jača senka
              },
            }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {reply.text}
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: "center" }}
                color="textSecondary"
              >
                Autor: {reply.firstName} {reply.lastName} | Datum:{" "}
                {new Date(reply.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">Nema odgovora na ovu temu.</Typography>
      )}
    </Box>
  );
}
