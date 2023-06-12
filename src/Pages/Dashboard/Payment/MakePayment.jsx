import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const MakePayment = () => {
    const [Class, setClass] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [price, setprice] = useState(0);
    const { id } = useParams();
    const token = localStorage.getItem("access-token");
    useEffect(() => {
        axios
            .get(`https://elite-sports-academy-server-ten.vercel.app/pay/selectedClasses/${id}`,{
                headers: {
                    authorization: `bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                const data = response.data;
                console.log(data);
                setClass(data);
                setprice(data.course.price);
            })
            .catch((error) => {
                console.error("Error fetching selected classes:", error);
            });
    }, [axiosSecure, id,token]);

    return (
        <Elements stripe={stripePromise}>
            <CheckOut price={price} Class={Class} />
        </Elements>
    );
};

export default MakePayment;
