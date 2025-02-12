import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Catalog from "../catalog/Catalog";
import Science from "../features/logged_in/Science";
import Mathematics from "../features/logged_in/Mathematics";
import Technology from "../features/logged_in/Technology";
import Engineering from "../features/logged_in/Engineering";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ArticleDetails from "../catalog/ArticleDetails";
import LoginForm from "../account/LoginForm";
import RegisterForm from "../account/registerForm";
import RequireAuth from "./RequireAuth";
import WelcomePage from "../welcome/WelcomePage";

import Quiz from "../quiz&test/Quiz";
import CareerOptions from "../quiz&test/CareerOptions";
import Forum from "../forum/Forum";
import TopicDetails from "../forum/TopicDetails";

import ForumInventory from "../admin/ForumInventory";
import UsersInventory from "../admin/UsersInventory";
import QuizInventory from "../admin/quizInventory";
import CatalogInventory from "../admin/CatalogInventory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "catalog", element: <Catalog /> },
          { path: "catalog/:id", element: <ArticleDetails /> },
          { path: "catalogInventory", element: <CatalogInventory /> },
          { path: "forumInventory", element: <ForumInventory /> },
          { path: "userInventory", element: <UsersInventory /> },
          { path: "quizInventory", element: <QuizInventory /> },
          { path: "quiz", element: <Quiz /> },
          { path: "career", element: <CareerOptions /> },
        ],
      },
      { path: "home", element: <WelcomePage /> },
      { path: "science", element: <Science /> },
      { path: "technology", element: <Technology /> },
      { path: "engineering", element: <Engineering /> },
      { path: "mathematics", element: <Mathematics /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "welcome", element: <WelcomePage /> },
      { path: "forum", element: <Forum /> },
      { path: "tema/:id", element: <TopicDetails /> },
     

      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
