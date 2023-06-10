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

    const [selectedClass, setSelectedClass] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [price, setprice] = useState(0);
    const { id } = useParams();
    
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:5000/pay/selectedClasses/${id}`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setSelectedClass(data);
                setprice(data.course.price)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching selected classes:", error);
            });
    }, [axiosSecure, id]);
 
    return (
        <Elements stripe={stripePromise}>
            <CheckOut price={price}/>
        </Elements>
    );
};

export default MakePayment;
