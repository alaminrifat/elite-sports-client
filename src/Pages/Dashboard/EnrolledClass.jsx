import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FadeLoader } from "react-spinners";
import useAxiosSecure from "../../hook/useAxiosSecure";
import setTitle from "../../hook/setTitle";

const EnrolledClass = () => {
    setTitle("Enrolled Classes");
    const { user } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setIsLoading(true);
        axiosSecure
            .get(`https://elite-sports-academy-server-ten.vercel.app/selectedClasses/${user?.email}`)
            .then((response) => {
                const data = response.data;
                // console.log(data);

                const unPaid = data.filter((item) => item.status === "paid");
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
                Your Enrolled Classes
            </h1>

            {isLoading ? (
                <div className="h-[600px] flex items-center justify-center">
                    <FadeLoader color="#36d7b7" />
                </div>
            ) : (
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   ms-2 md:ms-6 me-2 md:me-8">
                    {selectedClass.map((item) => (
                        <div
                            key={item._id}
                            className="card w-96 bg-base-100 shadow-xl"
                        >
                            <figure>
                                <img src={item.course.image} alt=""
                                className="h-64 w-full object-cover transition duration-500  sm:h-72 rounded-b-lg" />
                                
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
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledClass;
