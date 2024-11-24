import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutPage from "../features/about/AboutPage";
import HomePage from "../features/home/HomePage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [
            {path:'home', element:<HomePage/>},
            {path:'about', element:<AboutPage/>},
        ]
    }
])