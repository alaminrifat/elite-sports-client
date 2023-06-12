import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useInstructor from "../hook/useInstructor";
import useStudent from "../hook/useStudent";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import {
    FaHome,
    FaSignOutAlt,
    FaUserFriends,
    FaUserGraduate,
} from "react-icons/fa";
import { MdClass, MdLibraryAdd, MdLibraryBooks,  MdPayment } from "react-icons/md";
import setTitle from "../hook/setTitle";

const Dashboard = () => {
    setTitle("Dashboard");
    
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [isStudent] = useStudent();
    // console.log(isAdmin, isInstructor, isStudent);

    const { logOut, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.error("Logout Successful", { autoClose: 2000 });
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navOptions = (
        <>
            {isStudent && (
                <>
                    <li>
                        <NavLink to="selectedClasses">
                            <MdLibraryBooks></MdLibraryBooks>Selected Class
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="enrolledClasses">
                            <MdClass></MdClass> Enrolled Class</NavLink>
                    </li>
                    <li>
                        <NavLink to="paymentHistory">
                            <MdPayment></MdPayment> Payment Histoy</NavLink>
                    </li>
                </>
            )}
            {isInstructor && (
                <>
                    <li>
                        <NavLink to="viewCourse">
                            <MdLibraryBooks></MdLibraryBooks> View Your Classes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="addCourse">
                            <MdLibraryAdd></MdLibraryAdd> Add a New Class
                        </NavLink>
                    </li>
                </>
            )}
            {isAdmin && (
                <>
                    <li>
                        <NavLink to="manageUsers">
                            <FaUserFriends></FaUserFriends> Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="manageClasses">
                            <FaUserGraduate></FaUserGraduate> Manage Classes
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="drawer lg:drawer-open ">
            <ToastContainer></ToastContainer>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                ></label>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-[#00897b]  text-white text-lg">
                    {/* Sidebar content here */}
                    {navOptions}
                    <div className="divider "></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome> Home Page
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <button onClick={handleLogout}>
                                <FaSignOutAlt></FaSignOutAlt> Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
