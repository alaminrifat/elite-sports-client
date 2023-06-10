import setTitle from "../../../hook/setTitle";
import PopularClasses from "./PopularClasses";
import PopularInstructor from "./PopularInstructor";
import Slider from "./Slider";
import SportsActivity from "./SportsActivity";


const Home = () => {
    setTitle("Home");
    return (
        <div>
            <Slider/>
            <SportsActivity/>
            <PopularClasses/>
            <PopularInstructor/>
        </div>
    );
};

export default Home;