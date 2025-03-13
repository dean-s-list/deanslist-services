import Image from "next/image";

interface Testimonial {
    quote: string;
    logo: string;
    company: string;
    description: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div
            className="bg-gradient-to-tr from-[#2B153B] to-[#130821] text-white rounded-2xl shadow-md p-6 min-w-[300px] max-w-[450px] md:max-w-[300px] md:min-w-[500px] grid grid-rows-[1fr,fit] space-y-4"
        >
            <p className="text-lg">“{testimonial.quote}”</p>
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10">
                    <Image
                        src={testimonial.logo}
                        alt={`${testimonial.company} logo`}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <h3 className="font-semibold">{testimonial.company}</h3>
                        <Image 
                          src="/images/checkbadge.svg" 
                          alt="Verified Badge"
                          width={20} 
                          height={20} 
                        />
                    </div>
                    <p className="text-sm text-gray-300">{testimonial.description}</p>
                </div>
            </div>
        </div>
    );
}

export default TestimonialCard;