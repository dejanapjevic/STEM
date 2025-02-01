import  { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Divider,
  Grid,
} from "@mui/material";

// Dummy podaci za forum
const initialPosts = [
  {
    id: 1,
    author: "Milan Jovanović",
    content: "Kako funkcioniše React useEffect?",
    replies: [
      { id: 101, author: "Ana Petrović", content: "Koristi se za side effects!" },
      { id: 102, author: "Marko Nikolić", content: "Zavisi od dependency array-a." },
    ],
  },
  {
    id: 2,
    author: "Ivana Đorđević",
    content: "Kako radi async/await u JavaScript-u?",
    replies: [{ id: 201, author: "Stefan Pavlović", content: "Async funkcije vraćaju Promise." }],
  },
  {
    id: 3,
    author: "Nikola Stevanović",
    content: "Koja je razlika između var, let i const?",
    replies: [{ id: 301, author: "Jelena Mitrović", content: "var ima funkcioni scope, let i const block scope." }],
  },
  {
    id: 2,
    author: "Ivana Đorđević",
    content: "Kako radi async/await u JavaScript-u?",
    replies: [{ id: 201, author: "Stefan Pavlović", content: "Async funkcije vraćaju Promise." }],
  },
  {
    id: 2,
    author: "Ivana Đorđević",
    content: "Kako radi async/await u JavaScript-u?",
    replies: [{ id: 201, author: "Stefan Pavlović", content: "Async funkcije vraćaju Promise." }],
  },
  {
    id: 2,
    author: "Ivana Đorđević",
    content: "Kako radi async/await u JavaScript-u?",
    replies: [{ id: 201, author: "Stefan Pavlović", content: "Async funkcije vraćaju Promise." }],
  },
];

export default function ForumPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [reply, setReply] = useState("");
  const [activePost, setActivePost] = useState<number | null>(null);

  const handleReply = (postId: number) => {
    if (reply.trim() === "") return;

    const newPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, replies: [...post.replies, { id: Date.now(), author: "Vi", content: reply }] }
        : post
    );

    setPosts(newPosts);
    setReply("");
    setActivePost(null);
  };

  return (
    <Box sx={{ maxWidth: "90%", margin: "auto", padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3, fontWeight: "bold" }}>
        Forum Diskusije
      </Typography>
      
      {/* GRID KONTEJNER */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ padding: 2, borderLeft: "4px solid #5f4995", borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {post.author}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {post.content}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />

                {/* ODGOVORI */}
                {post.replies.map((reply) => (
                  <Card key={reply.id} sx={{ backgroundColor: "#f5f5f5", marginY: 1, padding: 1, borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      {reply.author}
                    </Typography>
                    <Typography variant="body2">{reply.content}</Typography>
                  </Card>
                ))}

                {/* Dugme za odgovaranje */}
                <Button size="small" sx={{ marginTop: 1 }} onClick={() => setActivePost(post.id)}>
                  Odgovori
                </Button>

                {/* Forma za odgovaranje */}
                {activePost === post.id && (
                  <Box sx={{ marginTop: 2 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Vaš odgovor"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      sx={{ marginBottom: 1 }}
                    />
                    <Button variant="contained" size="small" onClick={() => handleReply(post.id)}>
                      Pošalji
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
