import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Home/Shared/Navbar";
import Footer from "../Pages/Home/Shared/Footer";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;