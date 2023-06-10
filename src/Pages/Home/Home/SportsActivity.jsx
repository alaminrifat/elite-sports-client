import { BiFootball, BiCricketBall } from "react-icons/bi";
import { FaFootballBall, FaSwimmer } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { Fade, JackInTheBox, Roll, Slide } from "react-awesome-reveal";

const SportsActivity = () => {
    return (
        <div className="container mx-auto my-32">
            <h1 className="text-center text-4xl font-bold my-20">
                Our Sports Activity -{" "}
                <span style={{ color: "teal", fontWeight: "bold" }}>
                    <Typewriter
                        className="text-teal-700"
                        words={["Football", "Rugby", "Swimming", "Cricket"]}
                        loop={false}
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h1>
            <div className="flex flex-col md:flex-row justify-around gap-4">
                {/* flex justify-around  gap-6 */}
                <div className="flex flex-col items-center text-center gap-4">
                    <Roll>
                        {" "}
                        <BiFootball className="text-8xl"></BiFootball>
                    </Roll>
                    <h1>Football</h1>
                    <Fade delay={2} cascade damping={0.1}>
                        <p>
                            Delivering expert coaching and unparalleled skill
                            development.
                        </p>
                    </Fade>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                    <JackInTheBox>
                        <FaFootballBall className="text-8xl"></FaFootballBall>
                    </JackInTheBox>

                    <h1>Rugby</h1>
                    <Fade delay={2} cascade damping={0.1}>
                        <p>
                            Offering expert instruction and unmatched technique
                            refinement.
                        </p>
                    </Fade>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                    <Slide direction="right">
                        <FaSwimmer className="text-8xl"></FaSwimmer>
                    </Slide>
                    <h1>Swimming</h1>
                    <Fade delay={2} cascade damping={0.1}>
                        <p>
                            Providing top-tier coaching and remarkable skill
                            enhancement.
                        </p>
                    </Fade>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                    <Roll direction="left">
                        {" "}
                        <BiCricketBall className="text-8xl"></BiCricketBall>
                    </Roll>

                    <h1>Cricket</h1>
                    <Fade delay={2} cascade damping={0.1}>
                        <p>
                            Providing elite training and exceptional game
                            strategies.
                        </p>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default SportsActivity;