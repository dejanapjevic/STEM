import "../styles/App.css";
import { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./catalog/Header";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

  return (
    <>
      <ScrollRestoration />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <div className="App" style={{ overflowY: "auto" }}>
       <Header />
        <Outlet />
      </div>
    </>
  );
}
export default App;
