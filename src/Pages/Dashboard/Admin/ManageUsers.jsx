import axios from "axios";
import { useQuery } from "react-query";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import setTitle from "../../../hook/setTitle";

const ManageUsers = () => {
    const token = localStorage.getItem("access-token");
    setTitle("Users");
    const {
        data: tqData = [],
        isLoading,
        refetch,
        error,
    } = useQuery({
        queryFn: async () => {
            const data = await axios(`https://elite-sports-academy-server-ten.vercel.app/all-users`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem(
                        "access-token"
                    )}`,
                },
            });
            // console.log({ fromTQ: data });
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
    // console.log(tqData);

    const makeInstructor = (userId) => {
        updateUserRole(userId, "instructor");
    };

    const makeAdmin = (userId) => {
        updateUserRole(userId, "admin");
    };

    const updateUserRole = (userId, role) => {
        axios
            .patch(`https://elite-sports-academy-server-ten.vercel.app/users/${userId}`, { role },{
                headers: {
                    authorization: `bearer ${token}`,
                }
            })
            .then(() => {
                toast.success(`User is now ${role}`);
                refetch();
            })
            .catch((error) => {
                toast.error("Error updating user role:", error);
            });
    };

    return (
        <div>
            <ToastContainer></ToastContainer>
            <h1 className="text-4xl font-bold my-10 text-center">Manage Users</h1>
            <div className="overflow-x-auto w-9/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-lg font-semibold">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tqData.map((data, index) => (
                            <tr key={data._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.role}</td>
                                <th>
                                    <button
                                        onClick={() => makeInstructor(data._id)}
                                        className="btn btn-sm bg-[#00897b] text-white hover:bg-[#04342f] me-2"
                                        disabled={
                                            data.role === "admin" ||
                                            data.role === "instructor"
                                        }
                                    >
                                        make instructor
                                    </button>
                                    <button
                                        onClick={() => makeAdmin(data._id)}
                                        className="btn btn-sm bg-cyan-600 text-white hover:bg-cyan-800"
                                        disabled={
                                            data.role === "admin" ||
                                            data.role === "instructor"
                                        }
                                    >
                                        make admin
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
