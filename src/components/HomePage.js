import React from "react";
import { useStateContext } from "../context/StateContext";
import UserInfo from "./UserInfo";

const HomeScreen = () => {
  const { setActiveTab } = useStateContext();

  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <UserInfo />

      {/* Total Prize Pool */}
      <div className="bg-neutral-900 rounded-lg p-4 mb-4">
        <p className="text-sm text-center text-neutral-400 mb-1">
          Total Prize Pool
        </p>
        <p className="text-2xl text-center font-bold">10,000,000 $SAI</p>
      </div>

      {/* Convert Button */}
      <div className="bg-neutral-900 rounded-lg p-4 mb-4 flex-col justify-between items-center">
        <div>
          <p className="font-semibold">💎 to $SAI</p>
          <p className="text-xs text-neutral-400">
            The more Diamonds you own, the more $SAI allocation you have.
          </p>
        </div>
        <button onClick={() => setActiveTab("tab-9")} className="flex-grow mt-4 font-medium bg-[#98ECFF] text-black py-2  w-full rounded-lg mr-2">
        Convert
          </button>
        {/* <button
          onClick={() => setActiveTab("tab-9")}
          className="bg-neutral-800 w-full text-white px-4 py-2 rounded"
        >
          Convert
        </button> */}
      </div>

      {/* Task List */}
      {[
        { name: "Onboarding", progress: "1/2 tasks done", reward: 500, tab: 'tab-5' },
        { name: "Basic Task", progress: "0/19 tasks done", reward: 16500, tab: 'tab-6' },
        { name: "OG Task", progress: "0/8 tasks done", reward: 44000, tab: 'tab-7' },
        { name: "Daily Task", progress: "0/9 tasks done", reward: 6500, tab: 'tab-8' },
      ].map((task, index) => (
        <div
          key={index}
          onClick={() => setActiveTab(task.tab)}
          className="bg-neutral-900 rounded-lg p-4 mb-2 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{task.name}</p>
            <p className="text-xs text-neutral-400">{task.progress}</p>
          </div>
          <div className="text-sm">+{task.reward} 💎</div>
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
