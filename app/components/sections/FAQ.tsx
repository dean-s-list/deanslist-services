import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs = [
	{
		question: "What's IslandDAO?",
		answer:
			"IslandDAO is a Service DAO consisting of Web3 power users who provide valuable feedback sessions, as well as a variety of other services and consultation to projects wishing to succeed in the space, or simply seeking to refine their products for an overall better UX.",
	},
	{
		question: "How can I join the community?",
		answer:
			"Join our discord to connect with the community and participate in discussions and Follow on Twitter/X to Stay updated!",
	},
	{
		question: "The difference between feedback bonanza and feedback bonanza plus?",
		answer:
			"Feedback Bonanza helps sellers gather feedback and increase visibility with basic tools for communication and order fulfillment. Feedback Bonanza Plus offers additional features like expanded marketing tools, personalized support, and advanced analytics to boost seller credibility and promotion. The Plus version provides a more comprehensive approach for enhancing your apps's potential.",
	},
	{
		question: "What are the benefits of joining the community?",
		answer:
			"Joining the IslandDAO community offers networking opportunities with like-minded individuals and professionals. You can collaborate on community-driven projects and contribute your skills to shape the future of the DAO. Members often get access to exclusive events, updates, and content. You may also have voting power to influence key decisions. Additionally, being part of the community provides opportunities for learning, growth, and recognition within the Web3 and blockchain space.",
	},
	{
		question: "When is the grant program available?",
		answer: "Join our community and proceed to the 'Grants program' channel for more updates.",
	},
];

function FAQ() {
	return (
		<div className="mx-auto max-w-[1440px]">
			<div className="relative mx-auto w-fit text-[#061E1E]">
                <div className="hidden md:block absolute -left-[1610px] top-[10px] h-2 w-[100rem] bg-[#061E1E]"></div>
                <div className="">FAQ</div>
            </div>
			<div className="bg-[#] h-auto grid grid-cols-1 md:grid-cols-2 my-8 mb-32 p-2 relative mx-auto max-w-[1440px]">
				
					{/* Background blur effect */}
					<div className="absolute hidden md:block h-[1052px] w-[277px] bg-[#DCFCE2] rounded-[100%] -top-[40rem] -left-[8rem] -rotate-[45deg] blur-[390px] "></div>
					

				<div className="md:pl-16 relative text-[#061E1E]">
					<p className="text-[36px] font-semibold">
						All the <span className="font-light font-editorial-new">A&rsquo;s</span> to your{" "}
						<span className="font-light font-editorial-new">Q&rsquo;s</span>
					</p>
					<p className="font-extralight text-[20px] text-[#061E1E]">
						Everything you need to know about our community.
					</p>
				</div>

				<div className="md:pr-16 text-[18px] text-[#061E1E]">
					<Accordion type="single" collapsible className="w-full">
						{FAQs.map((faq, i) => (
							<AccordionItem value={`item-${i}`} key={i}>
								<AccordionTrigger>{faq.question}</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
}

export default FAQ;
