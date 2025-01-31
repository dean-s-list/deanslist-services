import { CircleArrowUp } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { ArrowRight } from "lucide-react";

function Hero() {
	return (
		<div id="hero" className="relative pt-20 px-4 md:text-center flex flex-col md:items-center ">
			{/* Backgroud Blur Effect  */}
		<div className="absolute hidden md:block  h-[1052px] w-[177px] bg-[#9A59BA] rounded-[100%] -top-[40rem] -left-[15rem] rotate-[45deg] blur-[90px] -z-10"></div>
		<div className="absolute  h-[1852px] w-[77px] bg-[#9A59BA] rounded-[100%] -top-[40rem] left-[25rem] rotate-[65deg] blur-[110px] -z-10"></div>
		<div className="absolute hidden xl:block  h-[652px] w-[227px] bg-[#9A59BA] rounded-[100%] top-[20rem] -left-[15rem] rotate-[65deg] blur-[90px] -z-10"></div>
		<div className="absolute hidden xl:block h-[1452px] w-[377px] bg-[#9A59BA] rounded-[100%] -top-[20rem] -right-[10rem] -rotate-[15deg] blur-[190px] -z-10"></div>

			{/* Badge Section */}
			<div className="flex justify-center items-center space-x-4 mb-6 md:mt-5 bg-[#9A59BA80] p-1 rounded-full cursor-pointer text-xs md:text-normal max-w-[fit-content]">
				<span className="bg-white text-[#9A59BA] md:text-[15px] py-1  px-3 rounded-full">
					New feature
				</span>
				<p
					className="flex gap-2 items-center text-[12px] md:text-[15px]"
				>
					Check out the Realms dashboard <ArrowRight size={16} />
				</p>
			</div>

			{/* Main Title */}
			<h1 className="text-4xl md:text-[60px] md:leading-[70px] font-bold mb-8">
				<p >Web3 Native <span className="italic font-light font-editorial-new">Network State,</span> </p>
				<p>Solana&rsquo;s Most Dedicated Power Users.</p>
			</h1>

			{/* Subtitle */}
			<p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
				Dean&rsquo;s List connects Web3 expertise with Solana protocols, driving
				ecosystem growth and elevating user experiences.
			</p>

			{/* Buttons */}
			<div className="flex self-start md:self-auto md:justify-center space-x-4">
			<a href="https://discord.gg/deanslist" target="blank"  rel="noopener noreferrer">
			<button className="bg-[#9A59BA80] overflow-hidden md:py-[15px] py-[14px] px-[27px] relative rounded-full border border-[#9A59BA] font-medium hover:bg-purple-400 transition flex gap-2 items-center">
					<span className="left-[1px] absolute border-b-[2px] border-b-[#ffffff] md:h-[50px] h-[50px] blur-[2px] px-[82px] rounded-[20px] -z-10"></span> 
					<CircleArrowUp className="hidden md:block "/>

            Get Started
          </button>
				</a>

				<a href="https://github.com/dean-s-list" target="blank"  rel="noopener noreferrer">	
				<button className="text-white hidden py-2  px-6 rounded-lg font-medium hover:bg-white hover:text-purple-900 transition md:flex gap-2 items-center">
					Learn more <ArrowDown />
				</button>
				</a>

			</div>
			

			<div className="w-full hidden md:flex justify-center mt-[76px] overflow-hidden h-[320px] 	relative">
				<div className="w-[1024px] h-[1024px] rounded-full border-[10px] blur-[3px]  translate-y-1 border-[#351A45] absolute"></div>
				<div className=" w-[1024px] h-[1024px] rounded-full translate-y-4 ">
					<img src="/continents.png" className="w-full" />
				</div>
			</div>

			
		</div>
	);
}

export default Hero;