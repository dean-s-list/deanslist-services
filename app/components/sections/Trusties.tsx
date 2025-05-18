
  'use client';
  import Image from 'next/image';

const trustedLogos = [
  "image209.png", "image187.png", "image210.png", "image214.png", "image215.png",
  "image218.png", "image219.png", "image227.png", "image233.png", "realms.png",
  "gib.png", "image63.png", "image182.png", "image188.png", "image207.png",
  "image208.png", "image212.png", "image213.png", "image217.png", "image222.png",
  "image223.png", "image225.png", "image226.png", "image230.png", "image211.png",
  "image216.png", "image220.png", "image231.png", "image234.png", "image228.png",
  "image232.png", "image224.png", "image229.png"
];
 

function Trusties() {
  return (
    <div className="w-screen py-20 flex justify-center items-center text-white relative overflow-hidden" >
      <div className="w-full md:max-w-[1300px] flex flex-col items-center">
        <h6 className="text-sm font-semibold text-center text-white mb-6">
          We&apos;ve been trusted by <em className="font-light font-editorial-new">founders</em> from
        </h6>

        <div className="w-full overflow-hidden scroller" >
          <div className="flex overflow-hidden  w-max">
         <ul className="flex items-center gap-8 scroller__inner group hover:[animation-play-state:paused]">
            {trustedLogos.concat(trustedLogos).map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Trusted Logo ${idx + 1}`}
                width={12}
                height={12}
                className="w-12 h-12 flex-shrink-0 object-cover"
              />
            ))}
        </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Trusties;
