import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Link } from "react-router-dom";

const SelectedClass = () => {
    const { user } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setIsLoading(true);
        axiosSecure
            .get(`http://localhost:5000/selectedClasses/${user?.email}`)
            .then((response) => {
                const data = response.data;
                // console.log(data);

                const unPaid = data.filter((item) => item.status === "unpaid");
                setSelectedClass(unPaid);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching selected classes:", error);
            });
    }, [axiosSecure, user]);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold my-10 text-center">
                Your Selected Classes
            </h1>

            {isLoading ? (
                <div className="h-[600px] flex items-center justify-center">
                    <FadeLoader color="#36d7b7" />
                </div>
            ) : selectedClass.length ===0 ? (
                <div className="text-center my-8">
                    <p className="text-2xl font-bold">
                        No selected classes found.
                    </p>
                    <p>Please select a class to see it here.</p>
                </div>
            ) : (
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   ms-2 md:ms-6 me-2 md:me-8">
                    {selectedClass.map((item) => (
                        <div
                            key={item._id}
                            className="card w-96 bg-base-100 shadow-xl"
                        >
                            <figure>
                                <img src={item.course.image} alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {item.course.name}
                                </h2>
                                <p>${item.course.price}</p>
                                <p>
                                    Instructor: {""}
                                    {item.course.instructor}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Available Seat: {""}
                                    {item.course.availableSeats}
                                </p>
                                <div className="card-actions justify-end">
                                    <Link to={`/dashboard/payment/${item._id}`}>
                                        <button
                                            className="btn bg-[#00897b] btn-sm text-white hover:bg-[#04342f]"
                                            // onClick={() => handlePayNowClick(item)}
                                        >
                                            <FaMoneyCheckAlt></FaMoneyCheckAlt>{" "}
                                            Pay Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectedClass;
