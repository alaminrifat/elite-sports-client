import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("access-token");
    const axiosSecure = useAxiosSecure();

    const handleSelect = (classItem) => {
        if (!user) {
            toast.error("You need to login to select a class", {
                autoClose: 3000,
            });
            navigate("/login");
        } else {
            const selectedClass = {
                email: user.email,
                course: classItem,
                status: "unpaid",
            };
            // console.log(selectedClass);
            fetch("http://localhost:5000/classes", {
                method: "POST",
                headers: {
                    authorization: `bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedClass),
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    if (data.insertedId) {
                        toast.success(
                            "Class is selected, pay to enroll the class"
                        );
                    } else {
                        toast.error("This class has already been selected");
                    }
                });
        }
    };
    useEffect(() => {
        axiosSecure
            .get("/classes")
            .then((data) => {
                setClasses(data.data);
            })
            .catch((error) => {
                console.error("Error fetching classes:", error);
            });

        // fetch("http://localhost:5000/classes", {
        //     headers:{authorization:`bearer ${token}`},
        //     method: "GET",
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setClasses(data);
        //     });
    }, [axiosSecure]);
    return (
        <div>
            {/* Banner */}
            {/* TODO: Implment type writter / animation  */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ms-2 lg:ms-8 me-2 lg:me-8">
                {classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="group relative block overflow-hidden rounded-t-lg"
                    >
                        <img
                            src={classItem.image}
                            alt=""
                            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 rounded-b-lg"
                        />

                        <div
                            className={`relative border border-gray-100 p-6 ${
                                classItem.availableSeats === 0
                                    ? "bg-red-300"
                                    : "bg-white"
                            }`}
                        >
                            <span className="whitespace-nowrap bg-[#00897b] text-white   px-3 py-1.5 text-xs font-medium">
                                New
                            </span>

                            <h3 className="mt-4 text-lg font-medium text-gray-900">
                                {classItem.name}
                            </h3>

                            <p className="mt-1.5 text-md text-gray-700">
                                Instructor: {""}
                                {classItem.instructor}
                            </p>
                            <p className="mt-1.5 text-sm text-gray-700">
                                Available Seat: {""}
                                {classItem.availableSeats}
                            </p>
                            <p className="mt-1.5 text-sm text-gray-700">
                                ${classItem.price}
                            </p>

                            <div className="mt-4">
                                <button
                                    onClick={() => handleSelect(classItem)}
                                    disabled={classItem.availableSeats == 0}
                                    // className="disable block w-full rounded bg-[#00897b] text-white  p-4 text-sm font-medium transition hover:scale-105"
                                    className={`block w-full rounded text-white p-4 text-sm font-medium transition hover:scale-105 ${
                                        classItem.availableSeats === 0
                                            ? "bg-gray-700 cursor-not-allowed"
                                            : "bg-[#00897b] hover:bg-[#00695c]"
                                    }`}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
