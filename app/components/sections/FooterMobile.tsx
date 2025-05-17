import Image from 'next/image'
import Link from "next/link"

export default function FooterMobile() {
    return (
        <div className='md:hidden text-[#FFFFFF]'>

            <div className="mb-10 flex items-center gap-2 px-10  ">
                <Image src="dean.png" alt="logo" width={28} height={28} />
                <span className="text-xl font-semibold">IslandDAO</span>
            </div>

            <div className='flex justify-between px-10'>
                <nav>
                    <ul className='flex flex-col space-y-5'>
                        <a href="#hero" className='hover:text-[#D896F7] active:text-[#D896F7] focus:text-[#D896F7]'>Home</a>
                        <a href="#about-us" className='hover:text-[#D896F7] active:text-[#D896F7] focus:text-[#D896F7]'>About us</a>
                        <a href="#events" className='hover:text-[#D896F7] active:text-[#D896F7] focus:text-[#D896F7]'>Events</a>
                        <a href="#services" className='hover:text-[#D896F7] active:text-[#D896F7] focus:text-[#D896F7]'>Services</a>
                    </ul>
                </nav>

                <div>
                    <ul className='flex flex-col space-y-5'>
                        <Link href="/leaderboard" target="_blank" className="hover:text-gray-300">Leaderboard</Link>
                        <a href="https://deans-list-docs.pages.dev/" className="hover:text-gray-300" target="blank"><li>Documentation</li></a>
                        <a href="https://www.tensor.trade/trade/deanslist" target="blank" className="hover:text-gray-300"><li>NFT Store</li></a>
                        <a href="/privacy" className="hover:text-gray-300" target="blank"><li>Privacy</li></a>
                    </ul>
                </div>

            </div>

            <div className='my-10'>
                <div className="flex justify-center space-x-4 border-t border-[#002828]  pt-10 pb-5">
                    <a href="https://x.com/islanddao?s=21" target="blank" className="hover:text-gray-300">
                        <img src="twitter.png" alt="Twitter" className="w-6 h-6" />
                    </a>
                    <a href="https://discord.gg/dvHrj9SXQS" target="blank" className="hover:text-gray-300">
                        <img src="discord.png" alt="Discord" className="w-6 h-6" />
                    </a>
                    <a href="https://github.com/dean-s-list" target="blank" className="hover:text-gray-300">
                        <img src="git.png" alt="GitHub" className="w-6 h-6" />
                    </a>
                </div>
                <p className="text-center">&copy; {new Date().getFullYear()} IslandDAO. All rights reserved.</p>

            </div>
        </div>
    )
}
