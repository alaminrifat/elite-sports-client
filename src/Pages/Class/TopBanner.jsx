import Typewriter from "typewriter-effect";
const TopBanner = () => {
    return (
        <div className="bg-[#173931] mb-20">
            <div
                className="hero h-[800px]"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1484482340112-e1e2682b4856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80)",
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
                                        "Experience the elegance, physical well-being, and skillfulness of our sports classes ",
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

export default TopBanner;
