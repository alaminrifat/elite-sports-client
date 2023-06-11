import Typewriter from "typewriter-effect";
const TopBannerInstructor = () => {
    return (
        <div className="bg-[#173931] mb-20">
            <div
                className="hero h-[800px]"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1129&q=80)",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            W E L C O M E{" "}
                        </h1>
                        <p className="mb-5">
                            <Typewriter
                                options={{
                                    strings: [
                                        "Learn from our exprienced , elegent and special Coaches ",
                                    ],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBannerInstructor;
