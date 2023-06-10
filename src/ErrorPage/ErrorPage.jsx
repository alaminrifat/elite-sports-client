import { Link } from "react-router-dom";
import animationData from "../../src/assets/lottie/error_page.json";
import Lottie from "react-lottie";
const ErrorPage = () => {
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
            <section className="container mx-auto ">
                <div className="my-8">
                    <div className=" text-center flex flex-col items-center justify-center">
                        <Lottie
                            options={defaultOptions}
                            height={700}
                            width={600}
                            className="w-[600px]"
                        />

                        {/* <img src={error} alt="" className="w-full my-4" /> */}
                        <div className="flex flex-col items-center justify-center">
                            <p className=" mb-4 text-slate-400 text-md text-center animate-pulse">
                                Sorry we are unable to load the page you want{" "}
                                <br /> Please go back to home page
                            </p>
                            <Link
                                to="/"
                                className="btn border-none  bg-[#00897b] text-white hover:bg-[#0f4741] hover:animate-pulse"
                            >
                                Back to homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;
