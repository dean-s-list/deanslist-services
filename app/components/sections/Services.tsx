'use client';

import SectionHeader from "../ui/SectionHeader";
import ReactPlayer from "react-player";

const Services = () => {

    return (
        <div className="py-16 md:px-12 relative" id="services">
            {/* Background blur effect  */}
            <div className="absolute  md:h-[1052px] md:w-[277px] bg-[#9A59BA] rounded-[100%] -top-[10rem] -left-[8rem] -rotate-[45deg] blur-[390px] "></div>
            <div className="absolute  md:h-[1052px] md:w-[277px] bg-[#9A59BA] rounded-[100%] -top-[0rem] -right-[8rem] rotate-[45deg] blur-[390px] "></div>

            <SectionHeader title="Services"  />
            {/* Header Section */}
            <div className="md:text-center px-5 mb-12">
                <h2 className="text-4xl font-bold text-[#061E1E] ">
                    Community of Web3 <span className="font-editorial-new font-light">power users</span>.
                </h2>
                <p className="text-[#061E1E] mt-4  mx-auto text-[20px]">
                    As experienced Web3 users, we provide in-depth feedback sessions and a suite of consulting <br/> services to
                    projects looking to thrive in the space. From product quality to user experience, we’re <br /> here to elevate
                    your project to the next level.
                </p>
            </div>

            {/* Services Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  2xl:w-[1440px] lg:max-txl:w-[1020px]  mx-auto">

                {/* Feedback Review */}
                <div className="relative rounded-lg shadow-md flex flex-col space-y-4 overflow-hidden border-2 border-[#D47BFF]">
                    <div className="absolute hiiden md:block h-[152px]  w-[177px] bg-[#7e4898] rounded-[100%] top-[2rem] left-[5rem] -rotate-[45deg]  blur-[150px]"></div>
                    <div className="px-6 pt-6">
                        <h3 className="text-2xl font-semibold  ">Feedback Review</h3>
                        <p className="text-gray-300">
                            Our goal is to make your product user-friendly with top-notch functionality <br /> that meets industry standards.
                        </p>
                    </div>
                    <div className="w-full max-h-[165px] items-baseline">
                        <img src="/images/feedback-review.svg" alt="feedback review" className="w-full" />
                    </div>

                </div>

                {/* Decentragrants */}
                <div className="relative rounded-lg shadow-md flex flex-col space-y-4 overflow-hidden border-2 border-[#D47BFF]">

                    <div className="px-6 pt-6">
                        <div className="absolute hiiden md:block h-[252px] w-[207px] bg-[#D47BFF] rounded-[100%] -top-[2rem] left-[0rem] -rotate-[45deg]  blur-[150px]"></div>
                        <h3 className="text-2xl font-semibold">Grant Management</h3>
                        <p className="text-gray-300">
                            Empowering projects with grants to support innovative, solution-driven development tailored for DAO.
                        </p>
                    </div>
                    <div className="flex flex-wrap space-x-2 space-y-2 mt-4">
                        <img src="/images/feedback3.png" alt="feedback" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:col-span-2 gap-4 md:grid-cols-[40%,1fr]">
                    {/* Hackathon Judging */}
                    <div className="relative border-2 overflow-hidden border-[#D47BFF] rounded-lg shadow-md p-6 flex flex-col space-y-4">

                        <h3 className="text-2xl font-semibold">Hackathon Judging</h3>
                        <div className="hiiden md:block absolute  h-[152px] w-[127px] bg-[#D47BFF] rounded-[100%] -top-[2rem] left-[0rem] -rotate-[45deg]  blur-[110px]"></div>
                        <div className="absolute hiiden md:block h-[152px] w-[107px] bg-[#D47BFF] rounded-[100%] bottom-[2rem] right-[4rem] -rotate-[45deg]  blur-[100px]"></div>
                        <p className="text-purple-200">
                            The collective knowledge of our power users ensures that each project is assessed with a keen understanding
                            of the Web3 ecosystem.
                        </p>
                        <div className="flex relative justify-center items-center flex-grow h-[200px]">
                            {/* Hackathon Badges */}
                            <img src="/images/hackathon-judging.svg" alt="hackathon judging" />
                        </div>
                    </div>

                    {/* Feedback Bonanza */}
                    <div className="relative overflow-hidden border-2 border-[#D47BFF] rounded-lg shadow-md p-6 pb-0 pr-0 flex flex-col space-y-4">
                        <h3 className="text-2xl font-semibold">Feedback Bonanza: Live Feedback Session</h3>
                        <div className="hiiden md:block absolute  h-[252px] w-[107px] bg-[#D47BFF] rounded-[100%] bottom-[2rem] left-[1rem]   blur-[150px]"></div>
                        <div className="absolute hiiden md:block h-[152px] w-[407px] bg-[#D47BFF] rounded-[100%] bottom-[2rem] right-[4rem] -rotate-[45deg]  blur-[200px]"></div>
                        <p className="text-gray-300">
                            Get real-time, in-depth reviews tailored to your project. Our live feedback sessions deliver actionable
                            insights to help you refine and elevate your product.
                        </p>
                        <div className="relative w-full h-full grid grid-cols-[30%,1fr] gap-1">
                            <div className="py-2">
                                <img src="/images/feedback-bonanza.svg" alt="feedback bonanza" />
                            </div>
                            <div className=" w-full h-full">
                                <ReactPlayer url="https://youtu.be/ILuvSo5gw6w" width="100%" height="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;