import React from 'react';

const LeaderboardScreen = () => {
  const topUsers = [
    { name: 'Sunusi Danjuma', points: 440700, rank: 2, avatar: '👾' },
    { name: 'Vj Rusmayana', points: 452600, rank: 1, avatar: '🤵' },
    { name: 'Chizo_1_german', points: 431300, rank: 3, avatar: 'CC' },
  ];

  const otherUsers = [
    { name: 'Tung Nguyen', points: 415100, rank: 4, avatar: '🤖' },
    { name: 'Love Den', points: 411000, rank: 5, avatar: '👾' },
    { name: 'Trân Gia', points: 320900, rank: 6, avatar: '👾' },
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Total Users */}
      <div className="bg-neutral-900 rounded-lg p-4 mb-6">
        <p className="text-neutral-400 text-center mb-1">Total Users</p>
        <p className="text-3xl font-bold text-center">2,171,991</p>
      </div>

      {/* Tabs */}
      {/* <div className="flex mb-6">
        <div className="flex-1 text-center font-bold pb-2 border-b-2 border-white">Reward</div>
        <div className="flex-1 text-center text-neutral-400">Friends</div>
      </div> */}

      {/* Top 3 Users */}
      <div className="flex justify-between items-end mb-6">
        {topUsers.map((user, index) => (
          <div key={index} className={`flex flex-col items-center ${index === 1 ? 'order-2' : ''}`}>
            <div className={`w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center text-2xl mb-2 ${index === 1 ? '' : ''}`}>
              {user.avatar}
            </div>
            <p className="text-sm text-center mb-1">{user.name.length > 12 ? user.name.substring(0, 12) + '...' : user.name}</p>
            <div className="bg-neutral-900 rounded-full px-3 py-1 text-[13px] mb-1">
              💎 {user.points.toLocaleString()}
            </div>
            <div className={`w-12 h-12 flex items-center justify-center text-2xl font-bold
              ${index === 0 ? 'bg-neutral-600' : index === 1 ? 'bg-yellow-600' : 'bg-yellow-800'}`}>
              {user.rank}
            </div>
          </div>
        ))}
      </div>

      {/* Other Users */}
      {otherUsers.map((user, index) => (
        <div key={index} className="flex items-center justify-between bg-neutral-900 rounded-lg p-3 mb-2">
          <div className="flex items-center">
            <span className="text-neutral-400 mr-3">{user.rank}</span>
            <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-xl mr-3">
              {user.avatar}
            </div>
            <span>{user.name}</span>
          </div>
          <div className="bg-neutral-700 text-[13px] rounded-full px-3 py-1">
            {user.points.toLocaleString()} 💎
          </div>
        </div>
      ))}

    </div>
  );
};

export default LeaderboardScreen;