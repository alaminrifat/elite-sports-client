// StudentRoute
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FadeLoader } from "react-spinners";
import useStudent from "../hook/useStudent";

const StudentRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isStudent, isStudentLoading] = useStudent();
    const location = useLocation();

    if (loading || isStudentLoading) {
        return (
            <div className="h-[600px] flex items-center justify-center">
                <FadeLoader color="#36d7b7" />
            </div>
        );
    }

    if (user && isStudent) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
