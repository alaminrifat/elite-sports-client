import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    // TODO: load data from the server to have dynamic isAdmin based on Data
    // const isAdmin = true;
    const isAdmin = true;

    return (
        <div className="drawer lg:drawer-open ">
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
                    <li>
                        <NavLink to="selectedClasses">Selected Class</NavLink>
                    </li>
                    <li>
                        <NavLink to="enrolledClasses">Enrolled Class</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
