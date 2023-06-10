import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../../../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
    const { name, user, logOut, photo } = useContext(AuthContext);
    // console.log(name);
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.error("Logout Successful", { autoClose: 2000 });
                // Swal.fire("Logout", "LogOut Successfull", "success");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //

    const navOptions = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Home
                </NavLink>
            </li>

            <li>
                {" "}
                <NavLink
                    to="/classes"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Classes
                </NavLink>{" "}
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Dashboard
                </NavLink>
            </li>
            {user ? (
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            ) : (
                <li>
                    <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Login
                    </NavLink>
                </li>
            )}
        </>
    );
    return (
        <>
            <ToastContainer />
            <div className="navbar fixed z-10 bg-opacity-60 bg-[#00443d] text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-black bg-opacity-60"
                        >
                            {navOptions}
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to={"/"}>
                            <div className="w-16 rounded-full ms-10">
                                <img src="" className="w-16" />
                            </div>
                        </Link>
                        <Link
                            to={"/"}
                            className="normal-case font-bold md:text-3xl font-cursive text-white whitespace-nowrap"
                        >
                            Elite Sports Academy
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-10 px-1">{navOptions}</ul>
                </div>
                <div className="invisible lg:navbar-end  lg:visible me-10 ">
                    <div className="avatar placeholder rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                            {user ? (
                                <img id="yes-element" src={photo} alt={name} />
                            ) : (
                                <span id="no-element">X</span>
                            )}

                            {/* <span id="no-element">X</span> */}
                        </div>
                    </div>
                    <Tooltip
                        place="right"
                        anchorSelect="#yes-element"
                        content={name}
                    />
                    <Tooltip
                        place="right"
                        anchorSelect="#no-element"
                        content="No User"
                    />
                </div>
            </div>
        </>
    );
};

export default Navbar;
