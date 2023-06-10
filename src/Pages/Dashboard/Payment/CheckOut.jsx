import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";

const CheckOut = ({ price,Class }) => {
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const amount = parseFloat(price.toFixed(2));

    useEffect(() => {
        if (amount > 0) {
            axios
                .post("http://localhost:5000/create-payment-intent", { amount })
                .then((res) => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [amount]);

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
        setProcessing(true)
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
        setProcessing(false)
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            // store payment information to the database 
            const payment = {
              user: user?.email,
              trxID : paymentIntent.id,
              selectedCourseID: Class._id,
              courseId: Class.course._id,
              courseName: Class.course.name,
              instructor: Class.course.instructor,
              price: Class.course.price,
              date: new Date(),
            }
            axios.post('http://localhost:5000/payments',payment).then(res =>{
              // console.log(res.data);
              if(res.data.insertedId){
                toast.success('Payment Success!!')
              }
            })
        }
    };

    return (
        <div className="container mx-auto">
          <ToastContainer></ToastContainer>
            <h1 className="text-4xl text-center font-bold mt-6">
                Make Payment
            </h1>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
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
                    className="btn btn-primary btn-sm mt-4"
                    type="submit"
                    disabled={!stripe || processing || !clientSecret}
                >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        </div>
    );
};

export default CheckOut;
