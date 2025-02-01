import dynamic from "next/dynamic";

const Header = dynamic(() => import("./components/header"));
const Hero = dynamic(() => import("./components/sections/Hero"));
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
    <main className="min-h-screen bg-gradient-to-b from-[#090118] via-[#0C0223] to-[#090118] text-white overflow-x-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#090118]/50 via-transparent to-[#090118]/50 pointer-events-none" />
      <div className="relative z-10 pt-16">
        {/* Announcement Banner - Moved before Header */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
          <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Next-Gen NFT Collection Ready!</h3>
                  <p className="text-sm text-white/70">Experience your digital assets in a whole new way</p>
                </div>
              </div>
              <a
                href="/nft/stats"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors"
              >
                View NFTs
              </a>
            </div>
          </div>
        </div>

        <Header />
        
        <main className="relative">
          <Hero />
          <Partners />
          <Services />
          <Pricing />
          <Trusties />
          <Testimonials />
          <AboutUs />
          <Branches/>
          <Events />
          <FAQ />
          <Footer />
          <FooterMobile/>
          <Scroller />
        </main>
      </div>
    </main>
  );
}
