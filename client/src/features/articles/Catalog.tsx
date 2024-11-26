import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

export default function Catalog() {

    interface Article {
        id:number;
        title: string;
        description: string;
        pictureUrl:string;
      }

    const[articles,setArticles]=useState<Article[]>([]);

      useEffect(() => {
      fetch('http://localhost:5211/api/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      },[])

      if (articles.length === 0) {
        return <h2>Loading...</h2>;
      }

    return (
        <>
       <h1>Catalog</h1>
        <List>
        {articles.map((item:Article)=> (
          <ListItem key={item.id}>
            <ListItemAvatar>
                <Avatar src={item.pictureUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText> {item.title}-{item.description}</ListItemText>
          </ListItem>
        )
        )}
       </List>
       </>
    )
}