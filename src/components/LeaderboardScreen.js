import { Avatar, Chip } from "@telegram-apps/telegram-ui";
import { useTab } from "../context/TabContext";
import useTelegram from "../context/TelegramContext";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import React from "react";

const LeaderboardScreen = ({onScreenChange}) => {
  const { webApp, user } = useTelegram();
  const { setCurrentTab } = useTab();

  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
  };
  const topUsers = [
    { name: "Sunusi Danjuma", points: 440700, rank: 2, avatar: "👾" },
    { name: "Vj Rusmayana", points: 452600, rank: 1, avatar: "🤵" },
    { name: "Chizo_1_german", points: 431300, rank: 3, avatar: "🤖" },
  ];

  const otherUsers = [
    { name: "Tung Nguyen", points: 415100, rank: 4, avatar: "🤖" },
    { name: "Love Den", points: 411000, rank: 5, avatar: "👾" },
    { name: "Trân Gia", points: 320900, rank: 6, avatar: "👾" },
  ];

  return (
    <>
      <div className="bg-neutral-950 text-white min-h-screen p-4 flex flex-col">
        {/* Total Users */}
        <div className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-3 mb-4">
          <p className="text-neutral-400 text-center mb-1 text-[16px]">Total Users</p>
          <p className="text-2xl font-bold text-center">2,171,991</p>
        </div>

        <div className="flex justify-between items-end mb-6">
          {topUsers.map((user, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index === 1 ? "order-2" : ""
              }`}
            >
              <div
                className={`g-[#131313] border border-neutral-800 p-2 rounded-md flex items-center justify-center text-2xl mb-2 ${
                  index === 1 ? "" : ""
                }`}
              >
                {user.avatar}
              </div>
              <p className="font-semibold text-[12px] mb-2">
                {user.name.length > 12
                  ? user.name.substring(0, 12) + "..."
                  : user.name}
              </p>
              <div className="border border-neutral-800 bg-neutral-950 rounded-full text-[10px] px-2 py-1">
                💎 {user.points.toLocaleString()}
              </div>
              <div
                className={`w-8 h-8 border border-neutral-800 p-2 rounded-md flex items-center justify-center text-2xl font-bold
              ${
                index === 0
                  ? "bg-neutral-600"
                  : index === 1
                  ? "bg-yellow-600"
                  : "bg-yellow-800"
              }`}
              >
                {user.rank}
              </div>
            </div>
          ))}
        </div>

        {/* Other Users */}
        <div className="mb-6">
          {otherUsers.map((user, index) => (
            <div
              key={index}
              className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center"
            >
              <div className="flex flex-row items-center gap-2">
                <div className="bg-[#131313] border border-neutral-800 p-2 rounded-md">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[14px]">{user.name}</p>
                </div>
              </div>
              <span className="border border-neutral-800 bg-neutral-950 rounded-full text-[12px] px-2 py-1">
                +{user.points} 💎
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Sticky Footer */}
      <div className="sticky bottom-[-1px] flex items-center bg-[#0c0c0c] px-2 py-2 justify-between border-t border-neutral-800">
        <div className="flex items-center">
          {user && user.photo_url ? (
            <Avatar className="bg-neutral-600" src={user.photo_url} size={28} />
          ) : (
            <Avatar
              acronym={user ? user.first_name.charAt(0) : "A"}
              className="bg-neutral-600"
              size={28}
            />
          )}{" "}
          <div className="ml-2">
            <p className="font-normal text-[13px] flex flex-row gap-1 items-center">
              {user ? `${user.first_name} ${user.last_name}` : "Anonymous"}
              <Chip
                mode="elevated"
                className="bg-white p-1 mt-[2px] text-[8px] rounded-sm flex items-center justify-center text-black h-[12px] w-max"
              >
                <span className="text-black flex items-center justify-center font-medium text-[7px]">
                You
                </span>
              </Chip>
            </p>
            <p className="text-[10px] text-neutral-600"></p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="border text-center border-neutral-800 bg-[#131313] rounded-full text-[10px] px-[8px] py-[4px]"
            onClick={() => navigateToAnotherScreen("convert")}
          >
            💎 500
          </span>
        </div>
      </div>
    </>
  );
};

export default LeaderboardScreen;
