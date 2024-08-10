import React from 'react';

const CoinCard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">$GMCAT</h2>
          <div className="bg-yellow-500 rounded-lg p-4 mb-4">
            {/* Replace with actual cat image */}
            <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl">🐱</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">The official meme coin of gmAI</h3>
          <p className="mb-4">
            Just like other cool Solana founders, gmAI's founder Dexter is a cat enthusiast. This love for cats is baked into the project's DNA.
          </p>
          <p className="mb-4 italic">
            This is the purr-fect revolution in digital currency, meowww
          </p>
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">
              X (Twitter)
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">
              Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;