import  { useContext, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/login.json";
import setTitle from "../../hook/setTitle";
import { isValidEmail, isValidPassword } from "../../Utils/vaildation";
const Register = () => {
    setTitle("Register");

    // const { createUser } = useContext(AuthContext);
    const { createUser, updateInfo, setUser, logOut } = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleRegister = (event) => {
        setStatus(null);
        setError(null);
        // console.log('clicnke');
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            setError("Email or password Cann't be empty");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Invalid email address");
            return;
        }

        if (!isValidPassword(password)) {
            setError(
                "Invalid password. Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
            );
            return;
        }

        // console.log(name, photo, email, password);
        createUser(email, password)
            .then((result) => {
                setUser(result.user);
                setStatus("Account Created!! Please Login");
                updateInfo(name, photo)
                    .then(() => {
                        setStatus("Account Created!! Please Login");
                        // Swal.fire(
                        //     "Registered Success",
                        //     "Now Please Login To get Access",
                        //     "success"
                        // );
                        logOut();
                        navigate("/login");
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
            })
            .catch((error) => {
                if (
                    error.message ==
                    "Firebase: Error (auth/email-already-in-use)."
                ) {
                    setError("Email Already In Use!!");
                } else {
                    setError(error.message);
                }
            });
        form.reset();
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
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse gap-0 md:gap-16">
                    <div className="text-center">
                        <div>
                            <h1 className=" text-5xl font-bold text-[#00897b]">
                                Register now!
                            </h1>
                            <Lottie
                                options={defaultOptions}
                                // height={600}
                                // width={600}
                                className="w-[600px]"
                            />
                        </div>
                    </div>
                    <Form
                        onSubmit={handleRegister}
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
                                />
                            </div>
                            <p className="text-md">
                                {" "}
                                Already have an account? Please
                                <Link to={"/login"} className="text-indigo-500">
                                    Login here
                                </Link>
                            </p>
                            <div className="text-cente">
                                {status ? (
                                    <p className="text-teal-600">{status}</p>
                                ) : (
                                    <></>
                                )}
                                {error ? (
                                    <p className="text-red-500 ">{error}</p>
                                ) : (
                                    <></>
                                )}
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
