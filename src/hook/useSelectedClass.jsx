import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useSelectedClass = () => {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: selectedClass = [] } = useQuery({
        queryKey: ['selectedClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/selectedClasses/${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })
    return [selectedClass, refetch]
};

export default useSelectedClass;