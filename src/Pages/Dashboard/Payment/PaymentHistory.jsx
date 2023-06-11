import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const { user } = useContext(AuthContext);
    const options = {
        month: "short",
        day: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    useEffect(() => {
        fetch(`https://elite-sports-academy-server-ten.vercel.app/payment-history/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPayments(data);
            });
    }, [user]);
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold my-10 text-center">
                Payment History
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="text-lg font-bold">
                            <th></th>
                            <th>Course Name</th>
                            <th>Instructor</th>
                            <th>Paid Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.courseName}</td>
                                <td>{payment.instructor} </td>
                                <td>${payment.price} </td>
                                <td>{payment.trxID} </td>
                                <td>
                                    {new Date(payment.date).toLocaleString(
                                        "en-US",
                                        options
                                    )}{" "}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
