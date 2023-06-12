import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const Feedback = () => {
    return (
        <div className="container mx-auto flex items-center text-center py-20">
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="flex justify-center ">
                        <div className=" rounded-lg bg-slate-100 shadow-lg dark:bg-slate-600 dark:shadow-black/30 mb-10">
                            <div className="h-28 overflow-hidden rounded-t-lg"></div>
                            <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-slate-100 dark:border-neutral-800 dark:bg-neutral-800">
                                <img src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" />
                            </div>
                            <div className="p-6">
                                <h4 className="mb-4 text-2xl font-semibold">
                                    Maria Smantha
                                </h4>
                                <hr />
                                <p className="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    The coaches at Elite Sports Academy are exceptional. They push you to reach your full potential.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex justify-center">
                        <div className=" rounded-lg bg-slate-100 shadow-lg dark:bg-slate-600 dark:shadow-black/30 mb-10">
                            <div className="h-28 overflow-hidden rounded-t-lg "></div>
                            <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-slate-100 dark:border-neutral-800 dark:bg-neutral-800">
                                <img src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" />
                            </div>
                            <div className="p-6">
                                <h4 className="mb-4 text-2xl font-semibold">
                                    Lisa Cudrow
                                </h4>
                                <hr />
                                <p className="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    Joining Elite Sports Academy was the best decision I made. It's a game-changer for aspiring athletes!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex justify-center">
                        <div className=" rounded-lg bg-slate-100 shadow-lg dark:bg-slate-600 dark:shadow-black/30 mb-10">
                            <div className="h-28 overflow-hidden rounded-t-lg "></div>
                            <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-slate-100 dark:border-neutral-800 dark:bg-neutral-800">
                                <img src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" />
                            </div>
                            <div className="p-6">
                                <h4 className="mb-4 text-2xl font-semibold">
                                    John Smith
                                </h4>
                                <hr />
                                <p className="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    The training programs at Elite Sports
                                    Academy are tailored to individual needs,
                                    leading to remarkable progress.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Feedback;
