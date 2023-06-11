import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
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
import ViewCourses from "../Pages/Dashboard/Instructor/ViewCourses";
import MakePayment from "../Pages/Dashboard/Payment/MakePayment";
import ErrorPage from "../ErrorPage/ErrorPage";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import InstructorRoute from "./InstructorRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "classes",
                element: <Classes />,
            },
            {
                path: "instructors",
                element: <Instructors />,
            },
        ],
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            // for students
            {
                path: "student",
                element: (
                    <StudentRoute>
                        <StudentDashboard />
                    </StudentRoute>
                ),
            },
            {
                path: "selectedClasses",
                element: (
                    <StudentRoute>
                        <SelectedClass></SelectedClass>
                    </StudentRoute>
                ),
            },
            {
                path: "enrolledClasses",
                element: (
                    <StudentRoute>
                        <EnrolledClass></EnrolledClass>
                    </StudentRoute>
                ),
            },
            {
                path: "payment/:id",
                element: (
                    <StudentRoute>
                        <MakePayment></MakePayment>
                    </StudentRoute>
                ),
            },
            {
                path: "paymentHistory",
                element: (
                    <StudentRoute>
                        <PaymentHistory></PaymentHistory>
                    </StudentRoute>
                ),
            },
            // for instructors
            {
                path: "addCourse",
                element: (
                    <InstructorRoute>
                        <AddCourse></AddCourse>
                    </InstructorRoute>
                ),
            },
            {
                path: "viewCourse",
                element: (
                    <InstructorRoute>
                        <ViewCourses></ViewCourses>
                    </InstructorRoute>
                ),
            },
            // for addmin
            {
                path: "manageUsers",
                element: (
                    <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>
                ),
            },
            {
                path: "manageClasses",
                element: (
                    <AdminRoute>
                        <ClassesPage />
                    </AdminRoute>
                ),
            },
        ],
    },
]);
