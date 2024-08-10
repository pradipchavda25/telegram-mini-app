import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoEarthSharp } from "react-icons/io5";

import appBanner from '../images/sai-token-banner.png';
const SaiTokenScreen = () => {
  const socialLinks = [
    { icon: <FaXTwitter />, text: "X (Twitter)", link: "https://twitter.com/SharpeLabs" },
    { icon: <IoEarthSharp />, text: "Website", link: "https://sharpe.ai/" },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white h-[100%]  flex items-start justify-start">
      <div className="max-w-md w-full bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-center text-neutral-400">
            #SAI
          </h2>

          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <img src={appBanner} alt="" style={{ borderRadius: '6px' }} />
            </div>
          </div>

          <p className="text-center text-[14px] font-semibold text-neutral-50 mb-2">
          Official token of Sharpe AI
          </p>
          <p className="text-center text-[12px] px-4 text-neutral-300 mb-4">
          $SAI is the native utility token of Sharpe AI, incentivizing participation, funding development, and enabling governance in the ecosystem.
          </p>

          <div className="flex justify-center gap-1">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                className={`flex w-max items-center justify-center`} rel="noreferrer"
              >
                <span className="inline-flex w-max justify-center items-center text-nowrap rounded-md bg-[#0C0C0C] px-2 py-1 text-[13px] gap-1 font-normal text-neutral-400 ring-1 ring-inset ring-neutral-400/20">
                  {link.icon} {link.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaiTokenScreen;
