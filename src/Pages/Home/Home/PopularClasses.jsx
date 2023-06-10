import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/popularClasses")
            .then((response) => {
                setPopularClasses(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching popular classes:", error);
            });
    }, []);
    return (
        <div className="container mx-auto my-32">
            <h1 className="text-center text-4xl font-bold my-20">
                Popular Classes{" "}
                <span style={{ color: "teal", fontWeight: "bold" }}>
                    <Typewriter
                        className="text-teal-700"
                        words={["Don't Miss", "Enroll Now"]}
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
                {popularClasses.map((item) => (
                    <Fade key={item._id} delay={100}>
                        <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                            <img
                                alt="Home"
                                src={item.image}
                                className="h-56 w-full rounded-md object-cover"
                            />

                            <div className="mt-2">
                                <div className="text-sm text-gray-500">
                                    ${item.price}
                                </div>

                                <div>
                                    <p className="font-medium">{item.name}</p>
                                </div>

                                <div className="mt-2 flex items-center gap-1 text-xs">
                                    Instructor:<p> {item.instructor}</p>
                                </div>
                                <div className="mt-1 flex justify-start gap-10 text-gray-500 ">
                                    <p className="flex items-center gap-1 text-xs">
                                        Enrolled Students:
                                        <p> {item.enrolledStudents}</p>
                                    </p>
                                    <p className="flex items-center gap-1 text-xs">
                                        Available Seat:
                                        <p> {item.availableSeats}</p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
};

export default PopularClasses;
