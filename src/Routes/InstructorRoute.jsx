// InstructorRoute
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FadeLoader } from "react-spinners";
import useInstructor from "../hook/useInstructor";

const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isInstructorLoading) {
        return (
            <div className="h-[600px] flex items-center justify-center">
                <FadeLoader color="#36d7b7" />
            </div>
        );
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
