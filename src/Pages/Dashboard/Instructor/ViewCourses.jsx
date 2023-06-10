import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";

const ViewCourses = () => {
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (feedbackModalOpen) {
            window.my_modal_5.showModal();
        }
    }, [feedbackModalOpen]);
    const {
        data: tqData = [],
        isLoading,
        refetch,
        
    } = useQuery("classes", async () => {
        const response = await axios.get(
            `http://localhost:5000/all-classes/${user?.email}`,
            {
                headers: {
                    authorization: `bearer ${localStorage.getItem(
                        "access-token"
                    )}`,
                },
            }
        );
        // console.log({ fromTQ: response.data });
        return response.data;
    });
    useEffect(() => {
        refetch(); // Refetch the data whenever user.email changes
    }, [user?.email]);

    const viewFeedback = async (feedback) => {
        console.log(feedback);
        setFeedbackMessage(feedback);
        setFeedbackModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="h-[600px] flex items-center justify-center">
                <FadeLoader color="#36d7b7" />
            </div>
        );
    }

    return (
        <div>
            <ToastContainer />
            <h1 className="text-4xl font-bold my-10 text-center">Your Classes</h1>
            <div className="container mx-auto overflow-x-auto">
                <table className="table">
                    <thead className="text-lg font-semibold">
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
                        {tqData.map((item, index) => (
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
                                        </div>
                                    </div>
                                </td>
                                <td>{item.instructor}</td>
                                <td>{item.email}</td>
                                <td>{item.availableSeats}</td>
                                <td>${item.price}</td>
                                <td
                                    className={
                                        item.status === "denied"
                                            ? "text-red-600"
                                            : item.status === "approved"
                                            ? "text-teal-600"
                                            : item.status === "pending"
                                            ? "text-blue-600"
                                            : ""
                                    }
                                >
                                    {item.status}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-xs btn-success text-white"
                                        onClick={() =>
                                            viewFeedback(item.feedback)
                                        }
                                    >
                                        Feedback
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {feedbackModalOpen && (
                <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                >
                    <form className="modal-box">
                        <h3 className="font-bold text-lg">
                            Feedback From Admin
                        </h3>
                        <p className="py-4 text-xs">
                            Press ESC key or click the button below to close
                        </p>
                        <div className="card shadow-md bg-teal-500 text-white h-40">
                            <div className="card-body">
                                <h2 className="text-md">
                                    {feedbackMessage
                                        ? feedbackMessage
                                        : "No feedback found"}
                                </h2>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn btn-error text-white"
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

export default ViewCourses;
