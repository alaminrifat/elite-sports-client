import { useContext, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/login.json";
import setTitle from "../../hook/setTitle";
import { isValidEmail, isValidPassword } from "../../Utils/vaildation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

const Register = () => {
    setTitle("Register");

    const { createUser, updateInfo, setUser, logOut } = useContext(AuthContext);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => handleRegister(data);

    const handleRegister = (data) => {
        setStatus("");
        setError("");
        setIsLoading(true); // Set loading state to true

        const name = data.name;
        const photo = data.photoURL;
        const email = data.email;
        const password = data.password;
        const role = "Student";

        // Perform input validation
        if (!email || !password) {
            setError("Email or password cannot be empty");
            toast.error("Email or password cannot be empty");
            setIsLoading(false); // Set loading state to false
            return;
        }
        if (!isValidEmail(email)) {
            setError("Invalid email address");
            toast.error("Invalid email address");
            setIsLoading(false); // Set loading state to false
            return;
        }
        if (!isValidPassword(password)) {
            toast.error(
                "Invalid password. Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            );
            setError(
                "Invalid password. Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            );
            setIsLoading(false); // Set loading state to false
            return;
        }

        // Call the createUser function to register the user
        createUser(email, password)
            .then((result) => {
                setUser(result.user);
                setStatus("Account Created!! Please Login");
                // Call the updateInfo function to update user information
                updateInfo(name, photo)
                    .then(() => {
                        setStatus("Account Created!! Please Login");
                        toast.success("Account Created! Now Please Login");
                        logOut();
                        navigate("/login");
                    })
                    .catch((error) => {
                        toast.error(error.message);
                        setError(error.message);
                        setIsLoading(false); // Set loading state to false
                    });
            })
            .catch((error) => {
                if (
                    error.message ===
                    "Firebase: Error (auth/email-already-in-use)."
                ) {
                    toast.error("Email Already In Use!!");
                    setError("Email Already In Use!!");
                } else {
                    toast.error(error.message);
                    setError(error.message);
                }
                setIsLoading(false); // Set loading state to false
            });
        reset();
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div>
            {isLoading && (
                <div className="h-[600px] flex items-center justify-center">
                    {" "}
                    <FadeLoader color="#36d7b7" />
                </div>
            )}

            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse gap-0 md:gap-16">
                    <div className="text-center">
                        <div>
                            <h1 className="text-5xl font-bold text-[#00897b]">
                                Register now!
                            </h1>
                            <Lottie
                                options={defaultOptions}
                                className="w-[600px]"
                            />
                        </div>
                    </div>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                    >
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    className="input input-bordered"
                                    {...register("name", { required: true })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Your email"
                                    className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Your Password"
                                    className="input input-bordered"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Photo URL
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    placeholder="Your Photo URL"
                                    className="input input-bordered"
                                    {...register("photoURL", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <p className="text-sm">
                                Already have an account? Please{" "}
                                <Link to={"/login"} className="text-indigo-500">
                                    Login here
                                </Link>
                            </p>
                            <div className="text-center">
                                {isLoading ? ( // Display loading text when isLoading is true
                                    <p className="text-teal-600">Loading...</p>
                                ) : null}
                                {status ? (
                                    <p className="text-teal-600">{status}</p>
                                ) : null}
                                {error ? (
                                    <p className="text-red-500 ">{error}</p>
                                ) : null}
                            </div>
                            <div className="form-control mt-2">
                                <input
                                    className="btn bg-[#00897b] text-white hover:bg-[#0f4741]"
                                    type="submit"
                                    value="Sign Up"
                                />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
