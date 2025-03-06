import { Article } from "../models/article";
import ArticleCard from "./ArticleCard";
import "../../styles/App.css";
import { Grid2 } from "@mui/material";
import "../../styles/welcome.css";
interface Props {
  articles: Article[];
  style?: React.CSSProperties;
}
export default function ArticleList({ articles }: Props) {
  return (
    <Grid2 container spacing={3} >
      {articles.map((article: Article) => (
        <Grid2 key={article.id} size={3} display="flex" sx={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Dodajte prelaz za transformaciju i senku
          "&:hover": {
            transform: "scale(1.10)", // Povećajte karticu kada se pređe mišem
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", // Dodajte senku
          },
        }}>
          <ArticleCard key={article.id} article={article}  />
        </Grid2>
      ))}
    </Grid2>
  );
}
