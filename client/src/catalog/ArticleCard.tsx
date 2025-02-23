import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Article } from "../models/article";

interface Props {
  article: Article;
}
export default function ArticleCard({ article }: Props) {
  return (
    <Card
      sx={{
        marginBottom: "10px",
        backgroundColor: "white",
        border: "2px solid",
        borderColor: "#D3D3D3",
        borderRadius: "10px",
        boxShadow: "10",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        animation: "appear 0.7s ease-out",
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={article.pictureUrl}
        title={article.category}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            marginBottom: "56%",
            height: "2%",
            fontSize: 23,
          }}
        >
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", height: "2%", marginBottom: "-40%" }}
        >
          {article.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <Button size="medium" color="secondary" sx={{ fontWeight: "bold" }}>
          Dodaj u omiljeno
        </Button>
        <Button
          component={Link}
          to={`/catalog/${article.id}`}
          size="medium"
          color="secondary"
          sx={{
            fontWeight: "bold",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              color: "purple",
              fontWeight: "bold",
            },
          }}
        >
          Saznaj više
        </Button>
      </CardActions>
    </Card>
  );
}
