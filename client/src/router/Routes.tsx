import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutPage from "../features/about/AboutPage";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/logged_in/Catalog";
import Science from "../features/logged_in/Science";
import Mathematics from "../features/logged_in/Mathematics";
import Technology from "../features/logged_in/Technology";
import Engineering from "../features/logged_in/Engineering";
import ArticleDetails from "../features/logged_in/ArticleDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "science", element: <Science /> },
      { path: "technology", element: <Technology /> },
      { path: "engineering", element: <Engineering/> },
      { path: "mathematics", element: <Mathematics /> },
      { path: "catalog/:id", element: <ArticleDetails/> }
    ],
  },
]);
