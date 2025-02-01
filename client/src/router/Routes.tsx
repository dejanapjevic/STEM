import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import AboutPage from "../features/about/AboutPage";
import HomePage from "../features/home/HomePage";
import Catalog from "../catalog/Catalog";
import Science from "../features/logged_in/Science";
import Mathematics from "../features/logged_in/Mathematics";
import Technology from "../features/logged_in/Technology";
import Engineering from "../features/logged_in/Engineering";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ArticleDetails from "../catalog/ArticleDetails";
import LoginForm from "../features/account/LoginForm";
import RegisterForm from "../features/account/registerForm";
import RequireAuth from "./RequireAuth";
import WelcomePage from "../features/welcome/WelcomePage";
import Forum from "../features/logged_in/Forum";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element: <RequireAuth/>, children: [
        { path: "catalog", element: <Catalog /> },
        { path: "catalog/:id", element: <ArticleDetails /> },
      ]},
      { path: "home", element: <WelcomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "science", element: <Science /> },
      { path: "technology", element: <Technology /> },
      { path: "engineering", element: <Engineering /> },
      { path: "mathematics", element: <Mathematics /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "login", element: <LoginForm/> },
      { path: "register", element: <RegisterForm/> },
      { path: "welcome", element: <WelcomePage/> },
      { path: "forum", element: <Forum /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
