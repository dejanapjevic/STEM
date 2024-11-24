import '../styles/App.css';
import { useEffect } from "react";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
    const navigate = useNavigate(); 
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
