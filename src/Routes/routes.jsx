import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Blog from "../Pages/Blog/Blog";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[{
            path:"/",
            element:<Home></Home>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'blog',
            element:<Blog/>
        }
    ]
    },
]);
