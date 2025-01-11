import '../styles/App.css';
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
    <div className="App" style={{overflowY: 'auto'}}>
     {/* { <HeaderLoggedIn></HeaderLoggedIn> } */}
     <Outlet/> 
    </div>
    </>
   
  );
}
export default App;
