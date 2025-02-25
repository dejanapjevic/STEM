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
        overflow: "hidden", // Ovaj deo će pomoći da se izbegne preklapanje
      }}
    >
      <CardMedia
        sx={{
          height: 200,
          objectFit: "cover", // Ovaj deo čini da slika lepo popuni prostor
        }}
        image={article.pictureUrl}
        title={article.category}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {" "}
        {/* Povećali smo fleksibilnost prostora */}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px", // Smanjili smo marginu između naslova i opisa
            fontSize: 23,
            height: "auto", // Osiguravamo da se tekst lepo prikazuje
          }}
        >
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            height: "auto", // Omogućavamo da tekst raste u visinu
            marginBottom: "16px", // Razmak između opisa i dugmadi
          }}
        >
          {article.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
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
