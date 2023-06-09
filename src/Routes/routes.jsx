import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Blog from "../Pages/Blog/Blog";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import StudentDashboard from "../Pages/Dashboard/StudentDashboard";
import Classes from "../Pages/Class/Classes";
import SelectedClass from "../Pages/Dashboard/SelectedClass";
import EnrolledClass from "../Pages/Dashboard/EnrolledClass";
import Instructors from "../Pages/Instructors/Instructors";
import AddCourse from "../Pages/Dashboard/Instructor/AddCourse";
import ClassesPage from "../Pages/Dashboard/Admin/ClassesPage";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";

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
            path:'register',
            element:<Register></Register>
        },
        {
            path:'classes',
            element:<Classes/>
        },
        {
            path:'instructors',
            element:<Instructors/>
        },
        
        {
            path:'blog',
            element:<Blog/>
        }
    ]
    },{
        path:'dashboard',
        element:<Dashboard/>,
        children:[
            // for students
            {
                path:'student',
                element:<StudentDashboard/>
            },
            {
                path:'selectedClasses',
                element:<SelectedClass></SelectedClass>
            },
            {
                path:'enrolledClasses',
                element:<EnrolledClass></EnrolledClass>
            },
            // for instructors
            {
                path:'addCourse',
                element:<AddCourse></AddCourse>
            },
            // for addmin
            {
                path:'manageUsers',
                element:<ManageUsers></ManageUsers>
            },
            {
                path:'manageClasses',
                element:<ClassesPage/>
            },
        ]
    }
]
);
