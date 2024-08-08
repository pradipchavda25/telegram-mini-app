import React from 'react';

const ReferralScreen = () => {
  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-[#98ECFF] rounded-full flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="black">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-1">Referral</h1>
        <p className="text-neutral-400 text-center">Introduce Sharpe AI to friends and earn $SAI tokens.</p>
      </div>

      {/* Invite Card */}
      <div className="bg-neutral-900 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-[#98ECFF] rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="black">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold">Invite a friend</h2>
            <p className="text-sm text-neutral-400">
              +100💎 to each invited friend reach 1000💎
            </p>
          </div>
        </div>
        <div className="flex mt-3">
          <button className="flex-grow bg-[#98ECFF] font-semibold text-black py-2 rounded-lg mr-2">
            Invite Friend
          </button>
          <button className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900 rounded-lg p-4">
          <p className="text-neutral-400 mb-1">Total Friends</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-neutral-900 rounded-lg p-4">
          <p className="text-neutral-400 mb-1">Total Earn <span className="inline-block w-4 h-4 bg-neutral-600 rounded-full text-center text-xs">?</span></p>
          <p className="text-2xl font-bold">💎 0</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralScreen;