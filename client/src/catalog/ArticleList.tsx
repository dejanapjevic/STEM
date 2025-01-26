import { Article } from "../models/article";
import ArticleCard from "./ArticleCard";
import "../../styles/App.css";
import { Grid2 } from "@mui/material";
interface Props {
  articles: Article[];
  style?: React.CSSProperties;
}
export default function ArticleList({ articles }: Props) {
  return (
    <Grid2 container spacing={3}>
      {articles.map((article: Article) => (
        <Grid2 key={article.id} size={3} display="flex">
          <ArticleCard key={article.id} article={article} />
        </Grid2>
      ))}
    </Grid2>
  );
}
