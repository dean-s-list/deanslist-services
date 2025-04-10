import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("./components/sections/NavBar"));
const Hero = dynamic(() => import("./components/sections/Hero"));
const NetworkGraph = dynamic(() => import("./components/sections/NetworkGraph"));
const Partners = dynamic(() => import("./components/sections/Partners"));
const Services = dynamic(() => import("./components/sections/Services"));
const Pricing = dynamic(() => import("./components/sections/Pricing"));
const Trusties = dynamic(() => import("./components/sections/Trusties"));
const Testimonials = dynamic(() => import("./components/sections/Testimonials"));
const AboutUs = dynamic(() => import("./components/sections/AboutUs"));
const Events = dynamic(() => import("./components/sections/Events"));
const FAQ = dynamic(() => import("./components/sections/FAQ"));
const Footer = dynamic(() => import("./components/sections/Footer"));
const Branches = dynamic(() => import("./components/sections/Branches"));
const FooterMobile = dynamic(() => import("./components/sections/FooterMobile"));
const Scroller = dynamic(() => import("./components/ui/Scroller"));

export default function Home() {
    return (
        <main
            className="min-h-screen bg-gradient-to-b from-[#ABD6B3] via-[#ABD6B3] to-[#ABD6B3] text-white overflow-x-hidden relative -z-20">

            <div className="pt-4">
                <NavBar/>
            </div>

            <main className="relative">
                <Hero/>
                <Partners/>
                <Services/>
                <Pricing/>
                <Trusties/>
                <Testimonials/>
                <AboutUs/>
                <NetworkGraph/>
                <Branches/>
                <Events/>
                <FAQ/>
                <Footer/>
                <FooterMobile/>
                <Scroller/>
            </main>
        </main>
    );
}
