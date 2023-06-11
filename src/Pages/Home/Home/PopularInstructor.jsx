import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const PopularInstructor = () => {
    const [popularInstructors, setPopularInstructors] = useState([]);

    useEffect(() => {
        axios
            .get("https://elite-sports-academy-server-ten.vercel.app/popularInstructors")
            .then((response) => {
                setPopularInstructors(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching popular instructors:", error);
            });
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-4xl font-bold my-20">
                Popular Instructors{" "}
                <span style={{ color: "teal", fontWeight: "bold" }}>
                    <Typewriter
                        className="text-teal-700"
                        words={["Dedicated", "Professional"]}
                        loop={false}
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ms-3 me-3 md:me-0 md:ms-0">
                {popularInstructors.map((item) => (
                    <Fade key={item._id}>
                        <div
                           
                            className="card w-96 bg-base-100 shadow-xl my-10 p-2 dark:bg-slate-400"
                        >
                            <figure className="avatar">
                                <div className="w-40 rounded-full">
                                    <img
                                        // TODO: load dynamic image
                                        src={item.image}
                                        alt="Shoes"
                                    />
                                </div>
                            </figure>

                            <div className="card-body items-center">
                                <h2 className="card-title">{item?.name} </h2>
                                <p className="text-sm text-gray-600 ">
                                    Most Popular Class: {item?.course}
                                </p>
                                <p className="text-sm text-gray-600 ">
                                    Total Students: {item?.totalStudents}
                                </p>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
};

export default PopularInstructor;
