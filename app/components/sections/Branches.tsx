import React from 'react';

const Branches: React.FC = () => {
    return (
        <div className="lg:max-w-[1440px] pt-40 mx-auto ">
            <div className="relative mx-auto w-fit text-[#061E1E]">
                <div className="hidden md:block absolute -left-[1610px] top-[10px] h-2 w-[100rem] bg-[#061E1E]"></div>
                <div className="">Branches</div>
            </div>
        
            <div className="container w-full flex flex-col lg:flex-row justify-between lg:space-x-8 mb-12 relative">
                {/* Background blur effect */}
                <div className="absolute hidden md:block h-[952px] w-[207px] bg-[#9A59BA] rounded-[100%] -top-[10rem] -left-[10rem] -rotate-[45deg] blur-[390px]"></div>
                <div className="absolute hidden md:block h-[952px] w-[207px] bg-[#9A59BA] rounded-[100%] -top-[0rem] -right-[10rem] rotate-[45deg] blur-[390px]"></div>
            
                {/* Left Content */}
                <div className="flex flex-col relative md:pt-[30px] ">
                    <div className="p-4 ">
                        {/* <SectionHeader title="Branches" /> */}
                        <h4 className="text-[#061E1E] text-[36px] tracking-[1px] font-semibold mb-4">Our Regional <span className="font-light font-editorial-new">States</span></h4>
                        <h5 className="text-[20px] text-[#061E1E]">Countries in which you can find us IRL and visit our <br /> branches.</h5>
                    </div>
                </div>

                {/* Branch card */}
                <div className="flex flex-col gap-8 md:py-14 md:p-14 p-4">
                    {/* Card1 */}
                    <div className="flex flex-col min-w-[280px] md:w-[685px] md:h-36 border-2 border-[#51CC8B] rounded-lg pl-3 pt-1 pr-3 p-6 relative">
                        <img src="dlngimage.png" alt="Image Description" className="absolute right-0 top-0 h-full w-1/2 object-cover" />
                        <div className="relative z-10 mt-5">
                            <div className="flex items-center">
                                <h2>Deanslist NG</h2>
                                <img src="flag-nigeria.png" alt="Nigeria Flag" className="absolute top-0 left-0 w-6 h-6 ml-24" />
                            </div>
                            <div className="flex flex-col md:flex-row pt-5 gap-16">
                                <h3>Visit our regional office to get in touch with DeanslistNG community members and learn more about us.</h3>
                                <a href="https://deanslistng.com/" target="_blank" rel="noopener noreferrer">
                                    <button className="border-2 border-[#51CC8B] rounded-full w-full md:w-[120px] h-12 md:h-10 bg-[#009A49] md:bg-green-500 hover:bg-green-300 transition">Learn More!</button>
                                </a>
                            </div>
                        </div>
                        <div className="w-full h-full bg-gradient-to-r from-green-500 from-50% to-75% to-transparent top-0 left-0 absolute"></div>
                    </div>
                    {/* Card2 */}
                    <div className="rounded-lg relative flex flex-col min-w-[280px] md:w-[685px] md:h-36 border-2 pl-3 pt-1 pr-3 p-6 border-[#D6BE16]">
                        <img src="dlbrimage.png" alt="Image Description" className="absolute right-0 top-0 h-full w-1/2 object-cover" />
                        <div className="relative z-10 mt-5">
                            <div className="flex items-center">
                                <h2>Deanslist BR</h2>
                                <img src="flag-brazil.png" alt="Brazil Flag" className="absolute top-0 left-0 w-6 h-6 ml-24" />
                            </div>
                            <div className="flex flex-col md:flex-row pt-5 gap-16">
                                <h3>Visit our regional office to get in touch with DeanslistBR community members and learn more about us.</h3>
                                <a href="https://web-site-deanslist.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <button className="border-2 border-[#D6BE16] rounded-full w-full md:w-[120px] h-12 md:h-10 bg-[#AD9907] hover:bg-yellow-300 transition">Learn More!</button>
                                </a>
                            </div>
                        </div>
                        <div className="w-full h-full bg-gradient-to-r from-[#B1B60D] via-green-600 via-50% to-75% to-[transparent] top-0 left-0 absolute"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Branches;
