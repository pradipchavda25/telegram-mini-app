import React from "react";
import appBanner from '../images/image.png';
import { RiBookFill } from "react-icons/ri";
import tokenChart from '../images/Screenshot 2024-08-09 202803.png'
const TokenomicsScreen = () => {
  const socialLinks = [
    { icon: <RiBookFill />, text: "Tokenomics", link: "https://apeterminal.io/project/sharpe" },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen flex items-start justify-start">
      <div className="max-w-md w-full bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          <h1 className="text-[18px] font-bold px-2 mb-2 text-center">
          AI-powered Crypto Super App
          </h1>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#98ECFF]">
            Sharpe AI
          </h2>

          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <img src={tokenChart} alt="" />
            </div>
          </div>

          <p className="text-center text-[14px] text-neutral-300 mb-4">
          Sharpe AI aims to be the de facto interaction layer for crypto, offering an all-in-one, AI-powered platform for DeFi management, trading, and market intelligence.
          </p>
          <p className="text-center text-[14px] text-neutral-300 mb-6">
          Sharpe builds specialised NLP-based large-scale language models to power its terminal. SharpeGPT is not one but a set of hyper-small LLMs built for specific use cases such as sentiment analysis, predicting trends, or building optimal DeFi strategies.
          </p>

          <div className="grid grid-cols-1">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                className={'flex w-full items-center justify-center'} rel="noreferrer"
              >
                <span className="inline-flex w-max justify-center items-center text-nowrap rounded-md bg-[#0C0C0C] px-2 py-1 text-[12px] gap-1 font-medium text-neutral-400 ring-1 ring-inset ring-neutral-400/20">
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

export default TokenomicsScreen;

