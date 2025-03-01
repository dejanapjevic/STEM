import "../styles/App.css";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./catalog/Header";
import { NotificationProvider } from "./forum/NotificationContext";
import NotificationBar from "./forum/NotificationBar";
import { store } from "./store/store";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);


  console.log("Redux state:", store.getState());
  
  return (
    <NotificationProvider>
      <NotificationBar/>
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
    </NotificationProvider>
  );
}
export default App;
