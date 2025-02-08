import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, Button, TextField } from "@mui/material";

interface Reply {
  id: number;
  topicId: number;
  text: string;
  author: string;
  date: string;
}

interface Topic {
  id: number;
  title: string;
  author: string;
  date: string;
}

export function TopicDetails() {
  const { state }: { state: { topic: Topic; topicReplies: Reply[] } } = useLocation();
  const navigate = useNavigate();
  const { topic, topicReplies } = state || {};
  
  const [newReply, setNewReply] = useState(""); // Držimo stanje za novi odgovor
  const [replies, setReplies] = useState<Reply[]>(topicReplies || []); // Držimo stanje za odgovore

  const handleAddReply = () => {
    if (newReply.trim() === "") return; // Proveri da nije prazan odgovor

    const newReplyData: Reply = {
      id: replies.length + 1, // Novi ID odgovora
      topicId: topic.id,
      text: newReply,
      author: "Anonimni", // Možemo dodati ime korisnika
      date: new Date().toLocaleDateString(),
    };

    const updatedReplies = [...replies, newReplyData]; // Dodajemo novi odgovor u listu
    setReplies(updatedReplies); // Ažuriraj stanje odgovora

    // Navigiramo nazad sa novim podacima
    navigate(`/tema/${topic.id}`, {
      state: { topic, topicReplies: updatedReplies },
    });

    setNewReply(""); // Očisti polje za unos
  };

  if (!topic) {
    return <Typography variant="h6">Tema nije pronađena</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Card sx={{ mb: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h5">{topic.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            Autor: {topic.author} | Datum: {topic.date}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h6">Odgovori:</Typography>
      {replies.length > 0 ? (
        replies.map((reply: Reply) => (
          <Card key={reply.id} sx={{ mb: 2, p: 2 }}>
            <CardContent>
              <Typography variant="body1">{reply.text}</Typography>
              <Typography variant="body2" color="textSecondary">
                Autor: {reply.author} | Datum: {reply.date}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">Nema odgovora na ovu temu.</Typography>
      )}
      <Box sx={{ mt: 3 }}>
        <TextField
          label="Dodaj odgovor"
          fullWidth
          multiline
          rows={4}
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddReply}>
          Dodaj odgovor
        </Button>
      </Box>
    </Box>
  );
}
