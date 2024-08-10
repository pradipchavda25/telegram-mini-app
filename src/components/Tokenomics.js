import React from 'react';

const Tokenomics = () => {
  return (
    <div className="text-white py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tokenomics</h1>
        <div className="flex justify-center">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
            <div className="relative bg-gray-900 rounded-full p-4">
              <div className="flex justify-between items-center">
                <div className="font-bold text-2xl">1B</div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="text-sm">Pre-sale</div>
                    <div className="text-base font-bold">20%</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Foundation</div>
                    <div className="text-base font-bold">10%</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Liquidity & Airdrop</div>
                    <div className="text-base font-bold">15%</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">Community</div>
                    <div className="text-base font-bold">55%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-sm">
            gmAI Tokenomics is developed to fully reward the community, developers, and supporters of the gmAI ecosystem.
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>55% Community (unlocks over 8 years)</li>
            <li>20% Pre-sale (unlocks at TGE)</li>
            <li>10% Foundation (unlocks over 6 years)</li>
            <li>15% Liquidity & Airdrop (unlocks at TGE)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;