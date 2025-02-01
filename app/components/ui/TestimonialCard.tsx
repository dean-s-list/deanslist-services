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
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-6 bg-black rounded-lg leading-none flex items-center space-x-6">
                <Image
                    src={testimonial.logo}
                    alt={`${testimonial.company} logo`}
                    width={96}
                    height={96}
                    className="w-24 h-24 bg-purple-600 rounded-full ring-2 ring-purple-500/20"
                />
                <div className="space-y-2">
                    <p className="text-slate-300">{testimonial.quote}</p>
                    <p className="text-purple-400">
                        <span className="font-semibold">{testimonial.company}</span> — {testimonial.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TestimonialCard;
