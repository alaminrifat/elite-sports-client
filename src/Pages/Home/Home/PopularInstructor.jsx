import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const PopularInstructor = () => {
    const [popularInstructors, setPopularInstructors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/popularInstructors")
            .then((response) => {
                setPopularInstructors(response.data);
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
                           
                            className="card w-96 bg-base-100 shadow-xl my-10"
                        >
                            <figure className="avatar">
                                <div className="w-40 rounded-full">
                                    <img
                                        // TODO: load dynamic image
                                        src="https://i.pinimg.com/474x/a1/df/79/a1df7971b2399692675b0e42735bc107.jpg"
                                        alt="Shoes"
                                    />
                                </div>
                            </figure>

                            <div className="card-body items-center">
                                <h2 className="card-title">{item.name} </h2>
                                <p className="text-sm text-gray-600 ">
                                    Most Popular Class: {item.classes[0].name}
                                </p>
                                <p className="text-sm text-gray-600 ">
                                    Total Students: {item.totalStudents}
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
