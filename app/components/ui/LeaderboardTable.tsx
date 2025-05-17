"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { FaBolt } from "react-icons/fa"

const medalImages: { [key: number]: string } = {
  1: "/medals/ranki.png",
  2: "/medals/rankii.png",
  3: "/medals/rankiii.png",
  4: "/medals/rankiv.png",
  5: "/medals/rankv.png",
};


const leaderboardData = Array.from({ length: 50 }, (_, index) => ({
  rank: index + 1,
  username: `User${index + 1} Wallet`,
  governance: "100,000,00",
  multiplier: `${Math.floor(Math.random() * 100) + 1}%`, // Random multiplier %
  perks: index < 5 ? "Trip to ThailandDAO" : "VIP exclusive events",
}));

const LeaderboardTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const ranksPerPage = 10;

  // Filter based on search query
  const filteredData = leaderboardData.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current page data
  const indexOfLastRank = currentPage * ranksPerPage;
  const indexOfFirstRank = indexOfLastRank - ranksPerPage;
  const currentRanks = filteredData.slice(indexOfFirstRank, indexOfLastRank);

  return (
    <div className="bg-[#061E1E80] text-white p-6 w-full sm:w-[75%] mx-auto mt-10 rounded-lg">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-lg font-bold">Members Ranking</h2>
        <p className="text-sm text-gray-400">
          Keep track of members and their leaderboard rankings.
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="relative w-full sm:w-auto">
        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full sm:w-auto bg-transparent border border-[#1F242F80] rounded-md text-white focus:outline-none focus:border-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  
    {/* Table Wrapper with Horizontal Scroll on Mobile */}
    <div className="border border-[#1F242F80] rounded-lg mt-4 overflow-hidden p-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-[#1F242F80]">
              <th className="text-left py-2">Rank</th>
              <th className="text-left py-2">Member</th>
              <th className="text-left py-2">Governance (Multiplier)</th>
              <th className="text-left py-2">Perks</th>
            </tr>
          </thead>
          <tbody>
            {currentRanks.map((user) => (
              <tr key={user.rank} className="border-b border-[#1F242F80]">
                <td className="py-3 pr-8">
                  {medalImages[user.rank] ? (
                    <Image
                      src={medalImages[user.rank]}
                      alt={`Rank ${user.rank}`}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <span>{user.rank}</span> // Normal number for ranks 6 and above
                  )}
                </td>
                <td className="px-4 py-4 flex items-center w-[500px]">
                  <div className="w-8 h-8 bg-white rounded-full mr-3"></div>
                  {user.username}
                </td>
                <td className="py-3 whitespace-nowrap">
                  <span>{user.governance}</span>
                    <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#015570] to-[#22C5F9] text-white text-xs px-1 py-0.5 rounded-xl ml-2">
                       <FaBolt className="text-white text-sm mr-1" /> 4.0x
                    </span>
                    <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#015570] to-[#22C5F9] text-white text-xs px-1 py-0.5 rounded-xl ml-2">
                       <FaBolt className="text-white text-sm mr-1" /> 4.0x
                    </span>

                    <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#4E3E02] to-[#C09903] text-white text-xs px-1 py-0.5 rounded-xl ml-2">
                       <FaBolt className="text-white text-sm mr-1" /> 1.6M
                    </span>
                </td>



                <td className="py-3 italic text-gray-300">{user.perks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Pagination Section (Always Flex) */}
      <div className="flex justify-between items-center mt-4 p-4 bg-[#061E1E80] rounded-b-lg">
        <button
          className={`px-4 py-2 rounded bg-[#0D3A3A] ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#044B4B]"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {Math.ceil(filteredData.length / ranksPerPage)}
        </span>
        <button
          className={`px-4 py-2 rounded bg-[#0D3A3A] ${
            currentPage === Math.ceil(filteredData.length / ranksPerPage)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#044B4B]"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / ranksPerPage)))
          }
          disabled={currentPage === Math.ceil(filteredData.length / ranksPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default LeaderboardTable;