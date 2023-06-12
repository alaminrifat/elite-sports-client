import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Cardstyle.css";
import setTitle from "../../../hook/setTitle";

const CheckOut = ({ price, Class }) => {
    setTitle("Payment");
    const token = localStorage.getItem("access-token");
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (price > 0) {
            axios
                .post(
                    "https://elite-sports-academy-server-ten.vercel.app/create-payment-intent",
                    { price }
                )
                .then((res) => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        console.log(card);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("error", error);
            setCardError(error.message);
        } else {
            console.log(paymentMethod);
            setCardError("");
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        if (confirmError) {
            console.log(confirmError);
        }

        // console.log("payment intent", paymentIntent);
        setProcessing(false);
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            // store payment information to the database
            const payment = {
                user: user?.email,
                trxID: paymentIntent.id,
                selectedCourseID: Class._id,
                courseId: Class.course._id,
                courseName: Class.course.name,
                instructor: Class.course.instructor,
                price: Class.course.price,
                date: new Date(),
            };
            axios
                .post(
                    "https://elite-sports-academy-server-ten.vercel.app/payments",
                    payment,
                    {
                        headers: {
                            authorization: `bearer ${token}`,
                        },
                    },
                )
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success("Payment Success!!");
                    }
                });
        }
    };

    return (
        <div className="container mx-auto">
            <ToastContainer></ToastContainer>
            <h1 className="text-4xl text-center font-bold mt-16">
                Make Payment
            </h1>
            <form
                className="w-2/3 mx-auto mt-32  p-16 bg-slate-100 shadow-lg"
                onSubmit={handleSubmit}
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-success text-white btn-sm mt-4"
                    type="submit"
                    disabled={
                        !stripe || processing || !clientSecret || transactionId
                    }
                >
                    Pay
                </button>

                {cardError && (
                    <div className="alert alert-error text-w shadow-lg mt-6">
                        <p className="p-1">{cardError}</p>{" "}
                    </div>
                )}
                {transactionId && (
                    <div className="alert alert-success text-w shadow-lg mt-6">
                        <p className="p-1">
                            Transaction complete with transactionId:{" "}
                            <span className="font-bold ">{transactionId}</span>
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CheckOut;
