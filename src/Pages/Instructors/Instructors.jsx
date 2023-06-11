import { useEffect, useState } from "react";
import TopBannerInstructor from "../Class/TopBannerInstructor";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        try {
            const response = await fetch("https://elite-sports-academy-server-ten.vercel.app/instructors");
            const data = await response.json();
            // console.log(data);
            setInstructors(data);

            // Fetch number of classes for each instructor
            const instructorsWithClassCount = await Promise.all(
                data.map(async (instructor) => {
                    try {
                        const classCountResponse = await fetch(
                            `https://elite-sports-academy-server-ten.vercel.app/classes/count/${encodeURIComponent(
                                instructor.name
                            )}`
                        );
                        const classCountData = await classCountResponse.json();
                        // console.log(instructor,classCountData);
                        return {
                            ...instructor,
                            classCount: classCountData.count,
                        };
                    } catch (error) {
                        console.error(
                            `Error fetching class count for instructor '${instructor.name}':`,
                            error
                        );
                        return { ...instructor, classCount: 0 };
                    }
                })
            );
            setInstructors(instructorsWithClassCount);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    return (
        <>
            <TopBannerInstructor></TopBannerInstructor>
            <div className="container mx-auto ">
                <p className="text-4xl font-semibold text-center p-20 ">
                    Our Instructors
                </p>
                <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 ms-2 me-2 my-10">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor._id}
                            className="card card-side bg-base-100 shadow-xl"
                        >
                            <figure className="w-[250px]">
                                <img
                                    // TODO: set and get Instructor image
                                    src={instructor.image}
                                    alt=""
                                    className="p-4 rounded-3xl"
                                />
                            </figure>
                            <div className="card-body ">
                                <h2 className="card-title">
                                    {instructor.name}
                                </h2>
                                <p>Email: {instructor.email}</p>
                                <p>
                                    Number of Classes: {instructor.classCount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Instructors;
