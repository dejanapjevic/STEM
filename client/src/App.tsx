import "../styles/App.css";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./catalog/Header";

function App() {
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
        {location.pathname !== "/home" &&
          location.pathname !== "/" &&
          location.pathname !== "/quiz" &&
          location.pathname !== "/career" &&
          location.pathname !== "/forum" &&
          location.pathname !== "/login" &&
          location.pathname !== "/register" && <Header />}
        <Outlet />
      </div>
    </>
  );
}
export default App;
