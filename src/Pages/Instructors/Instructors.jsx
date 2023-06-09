import { useEffect, useState } from "react";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        try {
            const response = await fetch("http://localhost:5000/instructors");
            const data = await response.json();
            console.log(data);
            setInstructors(data);

            // Fetch number of classes for each instructor
            const instructorsWithClassCount = await Promise.all(
                data.map(async (instructor) => {
                    const classCountResponse = await fetch(
                        `http://localhost:5000/classes/count/${instructor.name}`
                    );
                    const classCountData = await classCountResponse.json();
                    return { ...instructor, classCount: classCountData.count };
                })
            );
            setInstructors(instructorsWithClassCount);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    return (
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
                        <figure>
                            <img
                                // TODO: set and get Instructor image
                                src="/images/stock/photo-1635805737707-575885ab0820.jpg"
                                alt="Movie"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{instructor.name}</h2>
                            <p>Email: {instructor.email}</p>
                            <p>Number of Classes: {instructor.classCount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instructors;