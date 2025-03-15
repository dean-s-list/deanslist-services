"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../components/NFTHeader"));

const roadmapData = [
  {
    quarter: "April 2025",
    title: "Stage One: DAO Rebranding",
    status: "in-progress",
    progress: 65,
    progressItems: [
      { text: "Rename the DAO", status: "in-progress", progress: 100 },
      { text: ["Launch the NFT ", <strong key="supply">(1,114 supply)</strong>], status: "in-progress", progress: 60 },
    ],
    icon: "🚀"
  },
  {
    quarter: "June/ July 2025",
    title: "Stage Two: NFT NYC & IslandDAO v3",
    status: "planned",
    progress: 0,
    progressItems: [
      { text: "Solana Solstice Event", status: "upcoming", progress: 0 },
      { text: ["Launch stage two mint ", <strong key="supply">(1,111 supply)</strong>], status: "upcoming", progress: 0 },
      { text: "IslandDAO v3", status: "upcoming", progress: 0 }
    ],
    icon: "🧑‍🤝‍🧑"
  },
  {
    quarter: "October 2025",
    title: "Stage Three: IslandDAO v4",
    status: "planned",
    progress: 0,
    progressItems: [
      { text: "IslandDAO v4", status: "upcoming", progress: 0 },
      { text: ["Final stage mint ", <strong key="supply">(1,111 supply)</strong>], status: "upcoming", progress: 0 },
    ],
    icon: "🏝️"
  },
  {
    quarter: "Future",
    title: "Global Growth",
    status: "planned",
    progress: 0,
    progressItems: [
      { text: "Plugin pages", status: "upcoming", progress: 0 },
      { text: "Showcase perks", status: "upcoming", progress: 0 },
      { text: "Reevaluate perks", status: "upcoming", progress: 0 }
    ],
    icon: "🌍"
  }
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-100 to-white">
      {/* Background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 bg-center [mask-image:linear-gradient(180deg,black,rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative">
        <Header />

        <main className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-4">
          <div className="flex flex-col gap-4">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl text-gray-800 mb-3 mt-5">Roadmap</h1>
              <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
                Our journey towards building the future of digital collectibles
              </p>

              {/* Whitepaper Link */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-purple-100 hover:border-purple-200 transition-colors">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <a
                  href="/whitepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Read our Whitepaper
                </a>
              </div>
            </div>

            {/* Roadmap Content */}
            <div className="relative px-4">
              {/* Adventure Path */}
              <div className="absolute top-8 left-0 right-0">
                {/* Base Path - Wavy line effect */}
                <svg className="w-full h-8 absolute top-0" preserveAspectRatio="none">
                  <path
                    d="M0,8 C150,8 150,24 300,24 C450,24 450,8 600,8 C750,8 750,24 900,24 C1050,24 1050,8 1200,8"
                    className="stroke-gray-200"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  {/* Progress overlay */}
                  <path
                    d="M0,8 C150,8 150,24 300,24 C450,24 450,8 600,8 C750,8 750,24 900,24 C1050,24 1050,8 1200,8"
                    className="stroke-purple-500"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="1200"
                    strokeDashoffset="900" /* Adjust this to move progress 600, 300 */
                  />
                </svg>
              </div>

              {/* Timeline Items */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
                {roadmapData.map((item) => (
                  <div key={item.quarter} className="group pt-3">
                    {/* Island Milestone Marker */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                      <div className={`w-8 h-8 rounded-full relative
                        ${item.status === 'completed'
                          ? 'bg-gradient-to-br from-green-400 to-green-500'
                          : item.status === 'in-progress'
                            ? 'bg-gradient-to-br from-purple-400 to-purple-500'
                            : 'bg-gradient-to-br from-gray-200 to-gray-300'}
                        transform transition-transform duration-300 group-hover:scale-110
                        shadow-lg ring-4 ring-white`}
                      >
                        {/* Island Icon */}
                        <span className="absolute inset-0 flex items-center justify-center text-lg">
                          {item.icon}
                        </span>
                        {/* Glow Effect */}
                        <div className={`absolute -inset-1 rounded-full blur-sm opacity-40
                          ${item.status === 'completed' ? 'bg-green-400' :
                            item.status === 'in-progress' ? 'bg-purple-400' : 'bg-gray-300'}`}
                        />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`mt-10 bg-white rounded-xl overflow-hidden
                      transform transition-all duration-300 group-hover:-translate-y-1
                      ${item.status === 'in-progress'
                        ? 'shadow-[0_0_0_1px_rgba(168,85,247,0.1),0_4px_20px_rgba(168,85,247,0.1)]'
                        : 'shadow-md'}`}
                    >
                      {/* Card Header */}
                      <div className={`px-4 py-3 border-b relative overflow-hidden
                        ${item.status === 'completed' ? 'bg-green-50' :
                          item.status === 'in-progress' ? 'bg-purple-50' :
                            'bg-gray-50'}`}
                      >
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0V0zm10 10h10v10H10V10zM0 10h10v10H0V10z" fill="%23000000" fill-opacity="0.5" fill-rule="evenodd"/%3E%3C/svg%3E")',
                            backgroundSize: '12px 12px'
                          }}
                        />
                        <div className="relative">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">{item.quarter}</span>
                            <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full
                              ${item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                item.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                                  'bg-gray-200 text-gray-600'}`}
                            >
                              {item.status.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-900 mt-1">{item.title}</h3>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="divide-y divide-gray-100">
                        {item.progressItems.map((progressItem, i) => (
                          <div key={i} className="p-3 hover:bg-gray-50/75 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full transform transition-transform
                                ${progressItem.status === 'completed' ? 'bg-green-500 scale-110' :
                                  progressItem.status === 'in-progress' ? 'bg-purple-500 scale-110' :
                                    'bg-gray-300'}`}
                              />
                              <span className="text-sm text-gray-600">
                                {Array.isArray(progressItem.text) ? progressItem.text : progressItem.text}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-8 pt-4 border-t border-gray-100">
                {['Completed', 'In Progress', 'Planned'].map((label) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full
                      ${label === 'Completed' ? 'bg-green-500' :
                        label === 'In Progress' ? 'bg-purple-500' :
                          'bg-gray-200'}`}
                    />
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <footer className="relative py-4 text-center text-sm text-gray-500">
              <p>© 2025 IslandDAO. All rights reserved.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}