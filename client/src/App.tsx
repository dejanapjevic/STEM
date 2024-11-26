import '../styles/App.css';
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
    const navigate = useNavigate(); 

    const[articles,setArticles]=useState([
      {title:'product1', description:'100.00'}
    ]);
    useEffect(() => {
    fetch('http://localhost:5211/api/articles')
    .then(response => response.json())
    .then(data => setArticles(data))
    },[])

    useEffect(() => {
      if (location.pathname === '/') {
          navigate('/home');
      }
  }, [location, navigate]); 
  return (
    <>
    <div className="App">
     <Header></Header>
     
     <Outlet/> 
    </div>
    </>
   
  );
}
export default App;
