import React from 'react';

const CompanyInfoScreen = () => {
  const ecosystemItems = [
    { name: 'gmInfra', description: 'Fastest AI Agent for Web3 Function Calling', icon: 'A', tag: 'Flagship Product' },
    { name: 'Intent.trade', description: 'The most powerful AI Trading tool for Solana', icon: '╥╥', tag: 'Flagship Product' },
    { name: '$GMCAT', description: 'Official Meme coin of Sharpe AI', icon: '🐱', tag: 'Official Mascot' },
    { name: 'AnotherUs', description: 'Create your digital twin in Crypto', icon: 'A⍝', tag: 'Built on Sharpe AI' },
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">Sharpe AI</h1>
        <p className="text-neutral-400">The operating layer of Solana AI</p>
      </div>

      {/* Menu Items */}
      <div className="space-y-2 mb-6">
        <div className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center mr-3">
              S
            </div>
            <div>
              <h2 className="font-bold">Overview</h2>
              <p className="text-sm text-neutral-400">Get to know about gmAI</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center mr-3">
              $
            </div>
            <div>
              <h2 className="font-bold">Tokenomics</h2>
              <p className="text-sm text-neutral-400">Discover $SAI Tokenomics & token use case</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Ecosystem */}
      <h3 className="text-neutral-400 mb-2">ECOSYSTEM</h3>
      <div className="space-y-2">
        {ecosystemItems.map((item, index) => (
          <div key={index} className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center mr-3">
                {item.icon}
              </div>
              <div>
                <h2 className="font-bold flex items-center">
                  {item.name}
                  <span className="ml-2 text-[12px] bg-neutral-700 text-white px-2 py-1 rounded-full">
                    {item.tag}
                  </span>
                </h2>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoScreen;