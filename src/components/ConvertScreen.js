import React from 'react';

const ConvertScreen = () => {
  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <p className="text-gray-400 text-sm mb-2">the more $SAI you will have.</p>
      <div className="flex justify-between mb-4">
        <div className="bg-neutral-900 rounded-full px-4 py-1 flex items-center">
          <span className="mr-1">💎</span> 500
        </div>
        <div className="bg-neutral-900 rounded-full px-4 py-1 flex items-center">
          <span className="mr-1">🕒</span> 0
        </div>
      </div>

      {/* Diamonds Info */}
      <div className="bg-neutral-900 rounded-lg p-4 mb-4 flex justify-between">
        <div>
          <p className="text-sm text-gray-400">Snapshot diamonds</p>
          <p className="font-bold">💎 0</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Converted diamonds</p>
          <p className="font-bold">💎 0</p>
        </div>
      </div>

      {/* Airdrop Snapshot */}
      <div className="bg-neutral-900 rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Airdrop Snapshot Phase One</h2>
        <p className="text-sm text-gray-400 mb-2">
          The conversion period will end in the next 00 Hours.
        </p>
        <div className="bg-neutral-800 rounded p-2 text-center">
          <p className="text-green-400 text-2xl font-bold">00:00:00</p>
        </div>
      </div>

      {/* Conversion Info */}
      <p className="text-center mb-4">
        You need at least <span className="text-green-400 font-bold">20,000</span> diamonds to
        convert them into $SAI.
      </p>

      {/* Conversion Options */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { diamonds: 1000, time: 1 },
          { diamonds: 2000, time: 2 },
          { diamonds: 5000, time: 7 },
          { diamonds: 10000, time: 17 },
          { diamonds: 20000, time: null },
          { diamonds: 50000, time: null },
        ].map((option, index) => (
          <div key={index} className="bg-neutral-900 rounded-lg p-4 text-center">
            <p className="font-bold">💎 {option.diamonds.toLocaleString()}</p>
            {option.time && (
              <>
                <p className="text-gray-400">↓</p>
                <p>🕒 {option.time}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Convert Button */}
      <button className="w-full bg-gray-700 text-white py-3 rounded-lg font-bold">
        Convert
      </button>
    </div>
  );
};

export default ConvertScreen;