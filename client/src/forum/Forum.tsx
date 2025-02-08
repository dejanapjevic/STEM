import { useState } from "react";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const topics = [
  { id: 1, title: "Kako učiti React?", author: "Marko", date: "08.02.2025" },
  { id: 2, title: "Najbolje prakse u .NET-u", author: "Jovana", date: "07.02.2025" },
];

let replies = [
  { id: 1, topicId: 1, text: "Ovo je odgovor na temu 1", author: "Autor 1", date: "2025-02-08" },
  { id: 2, topicId: 1, text: "Ovo je još jedan odgovor na temu 1", author: "Autor 2", date: "2025-02-08" },
];

export default function Forum() {
  const [forumTopics] = useState(topics);
  const navigate = useNavigate();

  const viewTopicDetails = (topicId: number) => {
    const topic = forumTopics.find((t) => t.id === topicId);
    const topicReplies = replies.filter((r) => r.topicId === topicId);
    navigate(`/tema/${topicId}`, { state: { topic, topicReplies } });
  };


  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dobrodošli na forum za diskusiju
      </Typography>
      <Box>
        {forumTopics.map((topic) => {
          const topicReplies = replies.filter((r) => r.topicId === topic.id);
          const repliesCount = topicReplies.length;

          return (
            <Card key={topic.id} sx={{ mb: 2, p: 2 }}>
              <CardContent>
                <Typography variant="h6">{topic.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Autor: {topic.author} | Datum: {topic.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Broj odgovora: {repliesCount}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => viewTopicDetails(topic.id)}
                >
                  Prikaži sve odgovore
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
