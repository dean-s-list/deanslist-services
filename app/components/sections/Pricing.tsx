import { BadgeCheck } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { CircleMinus } from "lucide-react";

function Pricing() {
    const bonanzaItems = [
        'Resolve critical issues in real-time for immediate impact, streamed live on X, YouTube, and Twitch. ',
        'Real-time testing and live insights for immediate adjustments from a panel of 6-8 experts.',
        'Optimize visuals and layout with direct feedback from experts.',
        'Optimize visuals, user journey, and layout with direct feedback from top-tier experts.',
        'In-depth analysis comparing your app to competitors, focusing on key areas of usability and design. ',
        'Feature requests tailored to enhance your app\'s potential and user engagement.',
        'Comprehensive summary and actionable recommendations delivered post-session.',
        'Sentiment Analysis for each power-user on the panel. ',
        'Mobile-only dApps will be reviewed in collaboration with the official Solana SAGA DAO. ',
    ];

    const bonanzaPlusItems = [
        'Resolve critical issues in real-time for immediate impact, streamed live on X, YouTube, and Twitch. ',
        'Real-time testing and live insights for immediate adjustments from a panel of 6-8 experts.',
        'Optimize visuals and layout with direct feedback from experts.',
        'Optimize visuals, user journey, and layout with direct feedback from top-tier experts.',
        'In-depth analysis comparing your app to competitors, focusing on key areas of usability and design. ',
        'Feature requests tailored to enhance your app\'s potential and user engagement.',
        'Comprehensive summary and actionable recommendations delivered post-session.',
        'Sentiment Analysis for each power-user on the panel. ',
        'Mobile-only dApps will be reviewed in collaboration with the official Solana SAGA DAO. ',
    ];

    const deepDiveItems = [
        'Feedback Bonanza and PLUS features included!',
        'Comprehensive 2-week review by a diverse team, including Solana Hackathon Judges, UX/UI experts, Solana power users, blind testers, and more!',
        'Actionable feature requests, UX/UI improvements, and user-journey adjustments for maximum usability. ',
        'In-depth competition analysis and Go-To-Market recommendations to elevate your app\'s position. ',
        'Governance structure insights and DAO advice to align your project with community goals. ',
        'Expert recommendations on tokenomics and distribution strategies for sustainable growth. ',
        'Static code analysis to identify and address common security pitfalls, in collaboration with Sec3. ',
        'Delivered in collaboration with the University of Waterloo Blockchain Club to bring diverse perspectives and innovative ideas. ',
        'All findings and recommendations compiled into a detailed, professional-grade report.',
    ];


    return (
        <div className="w-screen flex flex-col justify-center items-center text-white relative">
            {/* Background blur effect  */}
            <div className="absolute hidden md:block h-[1052px] w-[277px] bg-[#ABD6B3] rounded-[100%] -top-[10rem] -left-[8rem] -rotate-[45deg] blur-[390px] "></div>
            <div className="absolute hidden md:block  h-[1052px] w-[277px] bg-[#ABD6B3] rounded-[100%] -top-[0rem] -right-[8rem] rotate-[45deg] blur-[390px] "></div>

            <SectionHeader title="Pricing" isLeft={false} />
            <div className="flex flex-col items-center p-10">
                <h4 className="text-[#061E1E] text-4xl font-semibold mb-4 mt-2">Plans that fit your <span className="font-light font-editorial-new">scale</span></h4>
                <h5 className="text-[#061E1E]">No additional fees or hidden costs.</h5>
            </div>

            <div className="flex flex-col md:p-8 items-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:px-10 px-4">
                    {/* Feedback Bonanza */}
                    <div className="bg-[#061E1E] relative text-white py-4 shadow-lg flex flex-col h-full card-animated-border max-w-[470px] gap-4">
                        <div className="px-4">
                            <div className="hiiden md:block absolute  h-[552px] w-[127px] bg-[#DCFCE266] rounded-[100%] -top-[2rem] -right-[4rem]   blur-[150px]"></div>
                            <h2 className="md:text-xl text-lg font-bold mb-4">Feedback Bonanza</h2>
                            <p className="text-sm mb-4">
                                Live expert feedback on X, YouTube, and Twitch to optimize your dApp.
                            </p>
                            <h3 className="text-lg font-semibold mb-4">Features</h3>
                            <ul className="space-y-2 text-sm text-gray-300">

                                {bonanzaItems.map((item, index) => (
                                    <li className="flex items-start gap-2" key={index}>
                                        <span className="text-[#CFCDCD]">{
                                            index <= 5 ? <BadgeCheck size={22} /> : <CircleMinus size={22} />
                                        }</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="px-4 border-t border-[#175869] pt-4 mt-auto flex flex-col md:flex-row md:justify-between items-baseline">
                            <p className="text-5xl 2xl:mt-[3px] item lg:max-txl:text-4xl font-semibold">
                                <span className=" font-semibold text-4xl lg:max-txl:text-3xl">$</span>999<span className="text-sm text-gray-300">per session</span>
                            </p>

                            <a href="https://discord.gg/deanslist" target="blank" rel="noopener noreferrer" className="w-full md:w-auto">
                                <button className=" bg-[#175959] 2xl:-translate-y-[12px] w-full  md:px-6  overflow-hidden py-2 relative rounded-[10px] border border-[#156161] font-medium hover:bg-[#DCFCE266] transition flex gap-2 items-center  mt-5 md:mt-0">
                                    <span className="hidden lg:block md:left-[1px] absolute xl:border-b-[2px] border-b-[#ffffff] h-[40px] blur-[2px] px-16 rounded-[2px] -z-2 mb-[78px]"></span>

                                    <div className="w-fit mx-auto">Get Started </div>
                                </button>
                            </a>

                        </div>
                    </div>

                    {/* Feedback Bonanza PLUS */}
                    <div className="bg-[#175959]  text-white py-6 shadow-lg flex flex-col h-full card-animated-border relative max-w-[470px] gap-4">
                        <div className="px-4">
                            <div className="absolute top-6 right-1.5 bg-[#061E1E] text-xs font-bold px-2 py-1 rounded-full border border-[#ABD6B3]">
                                Most Popular
                            </div>
                            <h2 className="text-lg md:text-xl font-bold mb-4">Feedback Bonanza PLUS</h2>
                            <p className="text-sm mb-4">
                                Live on X, YouTube, and Twitch, get professional reviews and a detailed report.
                            </p>
                            <h3 className="text-lg font-semibold mb-4">Features</h3>
                            <ul className="space-y-2 text-sm">
                                {bonanzaPlusItems.map((item, index) => (
                                    <li className="flex items-start gap-2" key={index}>
                                        <span><BadgeCheck size={22} /></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="px-4 border-t border-[#ABD6] pt-4 mt-auto flex flex-col md:flex-row md:justify-between items-baseline">
                            <p className="text-5xl lg:max-txl:text-4xl font-semibold">
                                <span className="font-semibold text-4xl lg:max-txl:text-3xl">$</span>1,499<span className="text-sm text-gray-300">per session</span>
                            </p>

                            <a href="https://discord.gg/deanslist" target="blank" rel="noopener noreferrer" className="w-full md:w-auto">
                                <button className="bg-[#061E1E] 2xl:-translate-y-[12px] w-full overflow-hidden md:py-[10px] py-2 md:px-6 mt-5 md:mt-0 relative rounded-[10px] border border-[#ABD6B3] text-center font-medium hover:bg-gray-800 transition flex gap-2 items-center ">
                                    <span className="hidden lg:block left-[1px] absolute xl:border-b-[2px] border-b-[#ffffff] h-[40px] blur-[2px] text-center px-16 rounded-[2px] w-full  -z-2 mb-[78px]"></span>
                                    <div className="w-fit mx-auto">Get Started </div>

                                </button>
                            </a>

                        </div>
                    </div>

                    {/* Deep Dive Assessment */}
                    <div className="bg-[#061E1E] relative text-white py-6 shadow-lg flex flex-col gap-4 h-full card-animated-border max-w-[470px]">
                        <div className="px-4 lg:max-txl:relative ">
                            <div className="hiiden md:block absolute  h-[552px] w-[127px] bg-[#DCFCE266] rounded-[100%] -top-[2rem] -right-[4rem]   blur-[150px]"></div>
                            <h2 className="text-lg md:text-xl font-bold mb-4">
                                Deep Dive Assessment{" "}
                                <span className="bg-[#175959] lg:max-txl:absolute lg:max-txl:right-[25px] text-xs font-bold px-2 py-1 rounded-full border border-[#BFF1C8]">
                                    Exclusive
                                </span>
                            </h2>
                            <p className="text-sm mb-4">
                                The ultimate 2-week review package for dApps on Solana, crafted for exceptional growth and optimization.
                            </p>
                            <h3 className="text-lg font-semibold mb-4">Features</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {deepDiveItems.map((item, index) => (
                                    <li className="flex items-start gap-2" key={index}>
                                        <span className="text-[#CFCDCD]">
                                            <BadgeCheck size={22} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className=" px-4 border-t border-[#175869] pt-4 mt-auto flex flex-col md:flex-row md:justify-between items-baseline">
                            <p className="text-5xl lg:max-txl:text-4xl font-semibold">
                                <span className="font-semibold text-4xl lg:max-txl:text-3xl">$</span>4,999<span className="text-sm text-gray-300">per session</span>
                            </p>

                            <a href="https://discord.gg/deanslist" target="blank" rel="noopener noreferrer" className="w-full md:w-auto">
                                <button className="2xl:-translate-y-[12px]  bg-[#175959] w-full md:px-6 mt-5 md:mt-0 overflow-hidden py-2  relative rounded-[10px] border border-[#156161] font-medium hover:bg-[#DCFCE266] transition flex gap-2 items-center">
                                    <span className="hidden lg:block left-[1px] absolute xl:border-b-[2px] border-b-[#ffffff] h-[40px] blur-[2px] px-16 rounded-[2px] -z-2 mb-[78px]"></span>
                                    <div className="w-fit mx-auto">Get Started </div>

                                </button>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;