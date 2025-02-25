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

import Quiz from "../quiz&test/Quiz";
import CareerOptions from "../quiz&test/CareerOptions";
import Forum from "../forum/Forum";
import TopicDetails from "../forum/TopicDetails";

import ForumInventory from "../admin/ForumInventory";
import UsersInventory from "../admin/UsersInventory";
import QuizInventory from "../admin/quizInventory";
import CatalogInventory from "../admin/CatalogInventory";
import HomePage from "../account/HomePage";
import Quiz2 from "../quiz&test/Quiz2";
import VideoUpload from "../video-lectures/videoUpload";
import VideoList from "../video-lectures/videoList";
import Tutorials from "../video-lectures/tutorials";
import VideoLessons from "../video-lectures/VideoLesson";

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
          { path: "quiz", element: <Quiz /> },
          { path: "quiz2", element: <Quiz2 /> },
          { path: "career", element: <CareerOptions /> },
          { path: "videoupload", element: <VideoUpload /> },
          { path: "videos", element: <VideoList/> },
          { path: "tutorials", element: <VideoLessons/> },
        ],
      },
      { path: "home", element: <WelcomePage /> },

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
