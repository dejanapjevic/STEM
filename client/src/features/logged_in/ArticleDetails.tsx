import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../../article";
import { Typography } from "@mui/material";

export default function ArticleDetails() {

    const {id}=useParams<{id:string}>();
    const[article,setArticle]=useState<Article | null >(null);
    //kada prvi put load-ujemo kopomemntu, necemo je imati, moramo je dobiti od API-ja, zato ide null
    const[loading, setLoading]=useState(true); //true kada je zavrsen loading komponente

    useEffect(()=> {
    axios.get(`http://localhost:5211/api/Articles/${id}`)
    .then(response=>setArticle(response.data))
    .catch(error => console.log(error))
    .finally(()=>setLoading(false))
    },[id]);

    if(loading) return <h3>....Loading</h3>
    if(!article) return <h3>Article not found...</h3>
        return (
            <>
            <h1>{article.title} </h1>
            <h2> {article.category} </h2>
            <p>
            {article.content}
            </p>
            </>
          );
    
}