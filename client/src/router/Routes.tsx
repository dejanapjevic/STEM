import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Catalog from "../catalog/Catalog";

import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ArticleDetails from "../catalog/ArticleDetails";
import LoginForm from "../account/LoginForm";
import RegisterForm from "../account/registerForm";
import RequireAuth from "./RequireAuth";
import WelcomePage from "../welcome/WelcomePage";
import IsLoggedIn from "./isLoggedIn";
import Quiz from "../quiz&test/Quiz";
import CareerOptions from "../quiz&test/CareerOptions";
import Forum from "../forum/Forum";
import TopicDetails from "../forum/TopicDetails";

import ForumInventory from "../admin/ForumInventory";
import UsersInventory from "../admin/UsersInventory";
import QuizInventory from "../admin/quizInventory";
import CatalogInventory from "../admin/CatalogInventory";
import HomePage from "../account/HomePage";

import TutorialInventory from "../video-lectures/tutorialInventory";
import VideoLesson from "../video-lectures/VideoLesson";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "homepage", element: <HomePage /> },
          { path: "catalog", element: <Catalog /> },
          { path: "catalog/:id", element: <ArticleDetails /> },
          { path: "catalogInventory", element: <CatalogInventory /> },
          { path: "forumInventory", element: <ForumInventory /> },
          { path: "userInventory", element: <UsersInventory /> },
          { path: "quizInventory", element: <QuizInventory /> },
          { path: "tutorialInventory", element: <TutorialInventory /> },
          { path: "quiz", element: <Quiz /> },
          { path: "career", element: <CareerOptions /> },
          { path: "tutorials", element: <VideoLesson /> },
        ],
      },

      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "forum", element: <Forum /> },
      { path: "tema/:id", element: <TopicDetails /> },

      {
        element: <IsLoggedIn />, // Sprečava prijavljene korisnike da vide login/register/welcome
        children: [
          { path: "login", element: <LoginForm /> },
          { path: "register", element: <RegisterForm /> },
          { path: "welcome", element: <WelcomePage /> },
          { path: "home", element: <WelcomePage /> },
        ],
      },

      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
