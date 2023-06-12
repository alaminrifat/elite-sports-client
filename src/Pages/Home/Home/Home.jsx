import setTitle from "../../../hook/setTitle";
import Feedback from "./Feedback";
import PopularClasses from "./PopularClasses";
import PopularInstructor from "./PopularInstructor";
import Slider from "./Slider";
import SportsActivity from "./SportsActivity";


const Home = () => {
    setTitle("Home");
    return (
        <div className="dark:bg-slate-800 dark:text-white">
            <Slider/>
            <SportsActivity/>
            <PopularClasses/>
            <PopularInstructor/>
            <h1 className="text-center mt-20 font-bold text-4xl text-gray-700 dark:text-white">What our customer say!</h1>
            <Feedback/>
        </div>
    );
};

export default Home;