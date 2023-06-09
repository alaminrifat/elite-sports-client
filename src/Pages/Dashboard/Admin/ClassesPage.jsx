import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    useEffect(() => {
        fetchClasses();
    }, [classes]);

    const fetchClasses = () => {
        fetch("http://localhost:5000/all-classes", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setClasses(data);
            });
    };
    const handleApprove = async (classId) => {
        console.log(classId);
        try {
            await fetch(
                `http://localhost:5000/api/classes/${classId}/approve`,
                {
                    method: "PATCH",
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.modifiedCount > 0) {
                        toast.success("Course Approved Successfull");
                        fetchClasses();
                    }
                });
        } catch (error) {
            toast.error("Error approving class:", error);
        }
    };
    const handleDeny = async (classId) => {
        console.log(classId);
        try {
            await fetch(`http://localhost:5000/api/classes/${classId}/deny`, {
                method: "PATCH",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.modifiedCount > 0) {
                        toast.success("Course Denied Successfull");
                        fetchClasses();
                    }
                });
        } catch (error) {
            toast.error("Error deny class:", error);
        }
    };

    useEffect(() => {
        if (feedbackModalOpen) {
            window.my_modal_5.showModal();
        }
    }, [feedbackModalOpen]);

    const handleSendFeedback = (classId) => {
        setSelectedClass(classId);
        setFeedbackModalOpen(true);
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        console.log(feedbackMessage);
        try {
            await fetch(`/api/classes/${selectedClass}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ feedback: feedbackMessage }),
            });
            setFeedbackMessage("");
            setFeedbackModalOpen(false);
            fetchClasses();
        } catch (error) {
            console.error("Error sending feedback:", error);
        }
    };

    return (
        <div>
            <ToastContainer></ToastContainer>
            <h1>Classes</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {classes.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={item.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {item.name}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                United States
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.instructor}
                                    <br />
                                </td>
                                <td>
                                    email
                                    {item.instructorEmail}
                                </td>
                                <td>{item.availableSeats}</td>
                                <td>${item.price}</td>
                                <td>{item.status}</td>
                                <th>
                                    <button
                                        className="btn btn-success btn-xs me-2"
                                        onClick={() => handleApprove(item._id)}
                                    >
                                        approve
                                    </button>
                                    <button
                                        className="btn btn-error btn-xs me-2"
                                        onClick={() => handleDeny(item._id)}
                                    >
                                        deny
                                    </button>
                                    <button
                                        className="btn btn-info btn-xs"
                                        onClick={() =>
                                            handleSendFeedback(item._id)
                                        }
                                    >
                                        feedback
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Open the modal using ID.showModal() method */}
            {feedbackModalOpen && (
                <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                >
                    <form onSubmit={handleFeedbackSubmit} className="modal-box">
                        <h3 className="font-bold text-lg">
                            Write your feedback
                        </h3>
                        <p className="py-4 text-xs">
                            Press ESC key or click the button below to close
                        </p>
                        <textarea
                            className="textarea textarea-accent w-full"
                            placeholder="Feedback"
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
                        ></textarea>
                        <input
                            type="submit"
                            name="submit"
                            id="submit"
                            value="Submit"
                            className="btn btn-success btn-sm mt-4 text-white"
                        />
                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn"
                                onClick={() => setFeedbackModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default ClassesPage;
