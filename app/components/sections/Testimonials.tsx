import TestimonialCard from "../ui/TestimonialCard";
import SectionHeader from "../ui/SectionHeader";

const testimonials = [
	{
		quote:
			"The improved user experience and accessible technical information have made a noticeable difference. The site redesign made exploring DeansListDAO’s resources enjoyable and straightforward.",
		logo: "/images/logo/lulo.png", 
		company: "Lulo",
		description: "The modern way to grow your wealth.",
	},
	{
		quote:
			"All the feedback provided was incredibly valuable from both the engineering and design perspectives. Many of the actionable points are already being addressed, and we’ll have a lot of them fixed in the next update!",
		logo: "/images/logo/tensor.png",
		company: "Tensor",
		description: "Solana's Leading NFT Marketplace",
	},
	{
		quote:
			"This service has far exceeded our expectations with its outstanding delivery. We are thoroughly impressed by the exceptional quality and attention to detail! Outstanding work, kudos to the deanslistDAO team!",
		logo: "/images/logo/streamflow.png",
		company: "Streamflow",
		description: "Infrastructure for new Value Creation and Distribution.",
	},
	{
		quote:
		"We’ve seen a noticeable improvement in the website’s usability and the easy access to technical details, making it much easier to navigate and make informed decisions.",
		logo: "/images/logo/gip.png",
		company: "Gib.Work",
		description: "Web3 platform connecting businesses with freelance talent.",
	},
	{
		quote:
			"We’ve taken your feedback to heart and introduced key UI/UX improvements for a smoother experience. Plus, we’re excited to announce support for minting and trading, unlocking even more possibilities!",
		logo: "/images/logo/dreader.png",
		company: "dReader",
		description: "Discovering, reading, trading and collecting digital comics.",
	},
	{
		quote:
			"With improved accessibility to technical information, DeansListDAO has streamlined our workflow, allowing us to find exactly what we need without any hassle.",
		logo: "/images/logo/meme.png", 
		company: "Meme Royale",
		description: "The modern way to grow your wealth.",
	},
];

const Testimonials = () => {
	const topScrollingTestimonials = testimonials.slice(0, 3);
	const bottomScrollingTestimonials = testimonials.slice(3);

	return (
		<div className="max-w-[1440px] mx-auto  py-16 px-4 relative">
			<SectionHeader title="Testimonials" />
			{/* <div className="-top-10 relative flex justify-center text-[#061E1E] "> */}
                {/* <div className=" hidden md:block absolute -left-[955px] top-[10px] h-2 w-[100rem] bg-[#061E1E]"></div> */}
				{/* Testimonials */}
            {/* </div> */}
			<div className="md:text-center mb-12">
				<h2 className="text-[#FFFFFF] text-4xl font-bold">
					They say it <span className="font-light font-editorial-new">better</span> than we do!
				</h2>
				<p className="text-[#FFFFFF] mt-4">
					We&apos;re proud to be working with these incredible and outstanding
					projects, and thankful for their <br /> feedback, suggestions, and support.
				</p>
			</div>

			{/* Scrolling Cards */}
			<div className="overflow-hidden relative scroller mb-4">
				<div
					className="flex space-x-4 scroller__inner w-max"
				>
					{topScrollingTestimonials.map((testimonial, index) => (
						<TestimonialCard key={index} testimonial={testimonial} />
					))}
				</div>
			</div>
			<div className="overflow-hidden relative scroller" data-direction="right">
				<div
					className="flex space-x-4 mb-4 scroller__inner w-max"
				>
					{bottomScrollingTestimonials.map((testimonial, index) => (
						<TestimonialCard key={index} testimonial={testimonial} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Testimonials;