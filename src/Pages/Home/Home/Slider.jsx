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
                            src="https://images.unsplash.com/photo-1519921073932-251ce805ce3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
                            alt=""
                            className="w-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                            <h1 className="text-white text-2xl md:text-8xl font-bold dark:text-slate-400">
                                Welcome to Best Summer <br /> Sports Academy
                            </h1>
                        </div>
                    </figure>
                </SwiperSlide>
                <SwiperSlide>
                    <figure className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1485313260896-6e6edf486858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt=""
                            className="w-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                            <h1 className="text-white text-2xl md:text-8xl font-bold dark:text-slate-400">
                                Welcome to Best Summer <br /> Sports Academy
                            </h1>
                        </div>
                    </figure>
                </SwiperSlide>
                <SwiperSlide>
                    <figure className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1484482340112-e1e2682b4856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
                            alt=""
                            className="w-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                            <h1 className="text-white text-2xl md:text-8xl font-bold dark:text-slate-400">
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
