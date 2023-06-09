import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";


const useStudent = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // use axios secure with react query
    const {data: isStudent, isLoading: isStudentLoading} = useQuery({
        queryKey: ['isStudent', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/student/${user?.email}`);
            console.log(res.data.student);
            return res.data.student;
        }
    })

    return [isStudent, isStudentLoading];
};

export default useStudent;