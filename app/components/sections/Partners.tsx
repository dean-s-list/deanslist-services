import Image from 'next/image';
function Partners() {
	const partners = [
		{ img: "realms.png", name: "Realms", link: "https://www.realms.today" },
		{ img: "pubkey.png", name: "Pubkey", link: "https://app.pubkey.link/" },
		{ img: "solana.png", name: "Solana Foundation", link: "https://solana.com" },
		{ img: "coloseum.png", name: "Colosseum", link: "https://www.colosseum.org/" },
		{ img: "gib.png", name: "Gib.work", link: "https://gib.work" },
		{ img: "anthensdao.png", name: "AthensDAOx", link: "https://x.com/AthensDAOx?t=wzi42mLRmCfBXkTNOevt0w&s=08" },
		{ img: "waterloo.png", name: "University of Waterloo", link: "https://uwaterloo.ca/" },
		{ img: "sec.png", name: "Sec3", link: "https://pro.sec3.dev/" },
		{ img: "metaplex.png", name: "Metaplex", link: "https://www.metaplex.com/" },
		{ img: "alldomain.png", name: "AllDomains", link: "https://alldomains.id/" },
		{ img: "superteamcanada.png", name: "SuperTeam Canada", link: "https://superteam.ca/" },
		{ img: "superteambalkan.png", name: "SuperTeam Balkan", link: "https://superteam.fun/" },
		{ img: "superteamjapan.png", name: "SuperTeam Japan", link: "https://superteamjp.fun/" },
		{ img: "superteampoland.png", name: "SuperTeam Poland", link: "https://pl.superteam.fun/" },
		{ img: "superteamindia.png", name: "SuperTeam India", link: "https://in.superteam.fun/" },
		{ img: "saga.png", name: "Saga DAO", link: "https://sagamobiledao.com/" },
		{ img: "solfare.png", name: "Solflare", link: "https://www.solflare.com/" },
		{ img: "cabana.png", name: "Cabana Exchange", link: "https://cabana.exchange/" },
		{ img: "monkedao.png", name: "MonkeDAO", link: "https://monkedao.io/" },
		{ img: "metadao.png", name: "MetaDAO", link: "https://www.metadao.fi/" },
		{ img: "pilled.png", name: "", link: "https://superteam.fun/" },
	];
	
	
	return (
		<div className=" h-96 flex justify-center items-center text-white">
			<div className="w-screen md:w-[1000px] flex flex-col items-center">
				<h6 className="text-[#FFFFFF] text-sm md:text-[16px] font-semibold mb-4">Partners</h6>
				<h4 className="text-[#FFFFFF] xl:text-[36px]  font-bold mb-4">
					Our <span className="font-light font-editorial-new">partners</span> are our strength
				</h4>
				<div className="overflow-hidden w-full scroller">

					<div className="flex overflow-hidden  w-max">

						<ul className="flex items-center gap-8 scroller__inner group hover:[animation-play-state:paused]">
							{partners.map((partner, index) => (
								<li
									key={index}
									className="flex items-center justify-between gap-4 px-4 py-2"
								>
									<a href={partner.link} target="blank" rel="noopener noreferrer"
										className="flex items-center gap-4">
										<Image
											src={partner.img}
											alt={partner.name}
											width={40}
											height={40}
											className="w-[40px] h-[40px] "
										/>
										<span className="text-[24px] font-[600px] text-[#FFFFFF] ">{partner.name}</span></a>
								</li>
							))}
						</ul>

						<ul className="flex items-center gap-8 ml-6">
							{partners.map((partner, index) => (
								<li
									key={`duplicate-${index}`}
									className="flex items-center justify-between gap-4 px-4 py-2"
								>
									<Image
										src={partner.img}
										alt={partner.name}
										width={12}
										height={12}
										className="w-12 h-12 rounded-full"
									/>
									<span className="text-sm font-medium">{partner.name}</span>
								</li>
							))}
						</ul>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Partners;
