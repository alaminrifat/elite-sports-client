import { useContext, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/login.json";
import setTitle from "../../hook/setTitle";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    setTitle("Login");

    const { googleSignIn, setUser, loginWithEmail } = useContext(AuthContext);

    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const storeNewUser = (newUser) => {
        const user = {
            name: newUser.displayName,
            email: newUser.email,
            image: newUser.photoURL,
            role: "student",
        };
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(res => res.json())
        .then(data => {
            if(data.insertedId){
                toast.success('New user Sign in Success!');
            }
        })
    };

    const handleGoogleSignIn = () => {
        setStatus("");
        setError("");
        googleSignIn()
            .then((result) => {
                setError("");
                toast.success("Login Successful", { autoClose: 2000 });
                setStatus("Sign In Successfull");
                storeNewUser(result.user);
                setUser(result.user);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => hangleEmailLogin(data);

    const hangleEmailLogin = (data) => {
        setStatus("");
        setError("");
        const email = data.email;
        const password = data.password;
        console.log(email, password);
        loginWithEmail(email, password)
            .then((result) => {
                toast.success("Login Successful", { autoClose: 2000 });
                setError("");
                setStatus("Sign In Successfull");
                setUser(result.user);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error.message);
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
            <ToastContainer />
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse gap-1 md:gap-16">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-btn text-[#00897b] text-center ">
                            Login Now
                        </h1>
                        <div>
                            <Lottie
                                options={defaultOptions}
                                // height={400}
                                // width={400}
                                className="w-[400px]"
                            />
                        </div>
                    </div>
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 "
                    >
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
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
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <p className="text-md">
                                New here? Please{" "}
                                <Link
                                    to={"/register"}
                                    className="text-indigo-500"
                                >
                                    Register here
                                </Link>
                            </p>
                            <div className="text-center">
                                {status ? (
                                    <p className="text-teal-600">{status}</p>
                                ) : (
                                    <></>
                                )}
                                {error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="form-control mt-2">
                                <input
                                    className="btn bg-[#00897b] text-white hover:bg-[#0f4741]"
                                    type="submit"
                                    value="Login"
                                />
                                <button
                                    className="btn  bg-red-500 mt-4 hover:bg-red-600 border-none text-white"
                                    onClick={handleGoogleSignIn}
                                >
                                    Login with Google
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
