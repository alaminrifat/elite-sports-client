// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";

const Slider = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <figure className="relative">
                        <img
                            src="https://i.ibb.co/p0fG3tz/banner1.jpg"
                            alt=""
                            className="w-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                            <h1 className="text-white text-2xl md:text-8xl font-bold">
                                Welcome to Best Summer <br /> Sports Academy
                            </h1>
                        </div>
                    </figure>
                </SwiperSlide>
                <SwiperSlide>
                    <figure className="relative">
                        <img
                            src="https://i.ibb.co/p0fG3tz/banner1.jpg"
                            alt=""
                            className="w-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                            <h1 className="text-white text-2xl md:text-8xl font-bold">
                                Welcome to Best Summer <br /> Sports Academy
                            </h1>
                        </div>
                    </figure>
                </SwiperSlide>
                <SwiperSlide>
                    <figure className="relative">
                        <img
                            src="https://i.ibb.co/p0fG3tz/banner1.jpg"
                            alt=""
                            className="w-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                            <h1 className="text-white text-2xl md:text-8xl font-bold">
                                Welcome to Best Summer <br /> Sports Academy
                            </h1>
                        </div>
                    </figure>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Slider;
