
import { Article } from "../../article";
import ArticleCard from "./ArticleCard";
import '../../../styles/App.css';
interface Props {
    articles: Article[];
    style?: React.CSSProperties; 
}
export default function ArticleList({articles, style}:Props) {
    return (
         <ul style={{...style, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '15px',margin:'0', padding: '0' }}>
        {articles.map((article :Article)=> (
          <ArticleCard key={article.id} article={article}/>
        )
        )}
       </ul> 
    )
}