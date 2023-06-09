import axios from "axios";
import { useQuery } from "react-query";
import { FadeLoader } from "react-spinners";

const AdminHome = () => {
    const {
        data: tqData = [],
        isLoading,
        refetch,
        error,
    } = useQuery({
        queryFn: async () => {
            const data = await axios(`http://localhost:5000/all-users`,{
                headers:{authorization: `bearer ${localStorage.getItem('access-token')}` }
            });
            console.log({ fromTQ: data });
            return data?.data;
        },
        queryKey: ["users"],
    });
    if (isLoading)
        return (
            <div className="h-[600px] flex items-center justify-center">
                <FadeLoader color="#36d7b7" />
            </div>
        );

    if (error) return "An error has occurred: " + error.message;
    console.log(tqData);

    return (
        <div>
            <div className="overflow-x-auto w-9/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tqData.map((data,index) => (
                            <tr key={data._id} className="hover">
                                <th>{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.role}</td>
                                <th>
                                <button className="btn btn-sm bg-[#00897b] text-white hover:bg-[#04342f]">make instructor</button>
                                <button className="btn btn-sm bg-[#00897b] text-white hover:bg-[#04342f]">make admin</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;
