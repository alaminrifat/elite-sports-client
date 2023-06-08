import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const SelectedClass = () => {
    const { user } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/selectedClasses/${user?.email}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSelectedClass(data);
            });
    }, [user]);

    return (
        <>
            <h1 className="text-4xl container mx-auto mt-4">Your Selected Class</h1>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8   ms-2 md:ms-6 me-2 md:me-6">
                {selectedClass.map((item) => (
                    <div
                        key={item._id}
                        className="card w-96 bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img src={item.course.image} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.course.name}</h2>
                            <p>
                            ${item.course.price}
                            </p>
                            <p>
                                Instructor: {""}
                                {item.course.instructor}
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SelectedClass;
