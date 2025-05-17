import React from "react";
import CountdownTimer from "../components/ui/CountdownTimer";
import LeaderboardTable from "../components/ui/LeaderboardTable";
import { FaBolt } from "react-icons/fa";
import Image from "next/image";

const LeaderboardPage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center bg-[#010C0C] min-h-screen py-10">
      
      {/* Background Blurs */}
      <div className="relative   self-start">

<div className="absolute hidden md:block  h-[202px] w-[177px] bg-[#044B4B] rounded-[100%]  -top-[15rem] -left-[4rem] rotate-[45deg] blur-[120px] -z-100"></div>
</div>
<div className="relative  self-start">


<div className="absolute hidden md:block  h-[702px] w-[87px] bg-[#044B4B] rounded-[100%]  top-[19rem] -left-[4rem] rotate-[45deg] blur-[120px] -z-11"></div>
</div>
<div className="relative  self-end">

<div className="absolute hidden md:block  h-[1102px] w-[177px] bg-[#044B4B] rounded-[100%]  -top-[20rem] -left-[4rem] rotate-[deg] blur-[150px] -z-100"></div>
</div>
      {/* Page Heading */}
      <div className="text-left sm:text-center mt-10 sm:mt-6 pl-4">
  <h4 className="text-[#C4C4C4] text-lg font-light font-editorial-new">
    Leaderboard
  </h4>
  <h1 className="text-white text-4xl font-bold">
    The latest ranking from our DAO
  </h1>
  <h3 className="text-[#94969C]">
    The latest perk for top governance holders and NFT staking.
  </h3>
</div>


      {/* Leaderboard Boost Section */}
      <div className="w-full sm:w-[75%] h-auto mx-auto flex flex-col sm:flex-row justify-between border-2 border-[#BDECC3] rounded-lg mt-[50px] p-4 bg-gradient-to-r from-[#143434] to-[#061E1E]">
  <div className="w-full">
    <h5 className="text-white text-lg font-semibold">Leaderboard Boost:</h5>

    <div className="flex items-center gap-2 mt-3">
      <FaBolt className="text-blue-400 text-lg" />
      <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#27CBFF] via-white to-[#27CBFF]">
        Governance Multiplier
      </h4>
      <span className="flex items-center bg-gradient-to-r from-[#015570] to-[#22C5F9] text-white text-xs px-1 py-0.5 rounded-xl">
  <FaBolt className="text-white text-xs" /> 1.0x
</span>

    </div>

    <div className="flex items-center gap-2 mt-2">
      <FaBolt className="text-purple-400 text-lg" />
      <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#C69BF9] to-white">
        NFT Multiplier
      </h4>
      <span className="flex items-center bg-gradient-to-r from-[#3B1A51] to-[#853BB7] text-white text-xs px-1 py-0.5 rounded-xl">
        <FaBolt className="text-white text-sm" /> 1%
      </span>
    </div>
    
    <div className="flex items-center gap-2 mt-2">
      <FaBolt className="text-[#FFCB05] text-lg" />
      <h4 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FFCB05] to-white">
        Delegation Multiplier
      </h4>
      <span className="flex items-center bg-gradient-to-r from-[#4E3E02] to-[#C09903] text-white text-xs px-1 py-0.5 rounded-xl">
        <FaBolt className="text-white text-sm" /> 10k
      </span>
    </div>

    <p className="text-[#C4C4C4] mt-2 text-sm mt-4">
      Improve your ranking with governance activities on Realms staking and <br /> multipliers rewards from NFT staking.
    </p>
  </div>

  <div className="w-full flex justify-center sm:justify-end mt-12 sm:mt-0">
    <CountdownTimer targetDate="2025-02-10T00:00:00Z" />
  </div>
</div>


      {/* Rewards Section */}
      <div className="w-full sm:w-[75%] mx-auto flex justify-between items-center border-2 border-[#BDECC333] rounded-lg mt-5 p-6 bg-[#061E1E]">
  <div className="flex flex-col gap-4">
    <h5 className="text-[#BDECC3] font-semibold text-base sm:text-lg flex items-center gap-2">
      <Image src="/trip.png" alt="Trip" width={30} height={30} />
      Top 5: Free Trip to ThailandDAO
    </h5>
    <h4 className="text-white text-base sm:text-lg flex items-center gap-2">
      <Image src="/cele.png" alt="C" width={30} height={30} />
      Top 50: VIP Event and Parties
    </h4>
  </div>

  <Image 
    src="/island.png" 
    alt="Reward Island" 
    width={82} 
    height={82} 
    className="border-2 border-[#BDECC3] rounded-full"
  />
</div>

      {/* Leaderboard Table */}
      <LeaderboardTable />

      {/* Bottom Background Effects */}
      <div className="absolute bottom-0  self-start h-[0px] overflow-x-visible  w-[00px]">
        <div className="relative  h-full self-start">

        <div className="absolute  hidden md:block  h-[402px] w-[37px] bg-[#044B4B] rounded-[100%]  -bottom-[4rem] left-[rem] rotate-[deg] blur-[150px] -z-100"></div>
        <div className="absolute  hidden md:block  h-[50px] w-[157px] bg-[#044B4B] rounded-[100%]  bottom-0 left-[rem]  blur-[150px] -z-100"></div>
        </div>
      </div>

    </div>
  );
};

export default LeaderboardPage;
