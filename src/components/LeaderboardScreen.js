import { Avatar, Chip } from "@telegram-apps/telegram-ui";
import { useTab } from "../context/TabContext";
import useTelegram from "../context/TelegramContext";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import React, { useEffect } from "react";
import { IoDiamondOutline } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const LeaderboardScreen = ({ onScreenChange, userPoints }) => {
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

  useEffect(() => {
    // Add custom font
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add custom styles
    const style = document.createElement("style");
    style.textContent = `
      body {
        font-family: 'Poppins', sans-serif;
      }
      .shimmer {
        background: linear-gradient(90deg, #181818 0%, #2a2a2a 50%, #181818 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .glow {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      }
      .pulse {
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-neutral-950 text-white min-h-screen p-4 flex flex-col"
      >
        {/* Total Users */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-3 mb-4 shimmer"
        >
          <p className="text-neutral-400 text-center mb-1 text-[16px]">
            Total Users
          </p>
          <p
            className="text-2xl font-bold text-center"
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
          >
            2,171,991
          </p>
        </motion.div>

        <div className="flex justify-between items-end mb-6">
          {topUsers.map((user, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col items-center ${
                index === 1 ? "order-2" : ""
              }`}
            >
              <motion.div
                className={`bg-gradient-to-r w-[80px] from-[#181818] text-[18px] to-black border border-neutral-800 px-2 rounded-full flex items-center justify-center text-2xl mb-2 glow pulse`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {user.avatar}
              </motion.div>
              <p
                className="font-semibold text-[12px] mb-2"
                style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
              >
                {user.name.length > 12
                  ? user.name.substring(0, 12) + "..."
                  : user.name}
              </p>
              <span className="text-center flex items-center gap-1 bg-[#1d1d1d] rounded-full text-[12px] px-[8px] py-[4px]">
                {user.points.toLocaleString()}
                <IoDiamondOutline size={10} />
              </span>
              <div
                className={`w-8 h-8 border border-neutral-800 p-2 rounded-full flex items-center justify-center text-xl font-bold ${
                  index === 0
                    ? "bg-gradient-to-b from-neutral-600 to-neutral-950"
                    : index === 1
                    ? "bg-gradient-to-b from-yellow-600 to-yellow-950"
                    : "bg-gradient-to-b from-yellow-800 to-yellow-950"
                }`}
              >
                {user.rank}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Users */}
        <div className="mb-6">
          {otherUsers.map((user, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, backgroundColor: "#2a2a2a" }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-[#181818] to-black border rounded-md border-neutral-800 p-2 mb-2 flex justify-between items-center"
            >
              <div className="flex flex-row items-center gap-2">
                <div className="bg-[#131313] border text-[14px] border-neutral-800 p-2 rounded-md">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[13px]">{user.name}</p>
                </div>
              </div>
              <span className="text-center flex items-center gap-1 bg-[#1d1d1d] rounded-full text-[12px] px-[8px] py-[4px]">
                +{user.points}
                <IoDiamondOutline size={10} />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sticky Footer */}
      </motion.div>
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky bottom-0 flex items-center bg-gradient-to-b from-[#181818] to-black px-2 py-2 justify-between border-t border-neutral-800"
      >
        <div className="flex items-center">
          {user && user.photo_url ? (
            <Avatar
              className="bg-neutral-600 glow"
              src={user.photo_url}
              size={28}
            />
          ) : (
            <Avatar
              acronym={user ? user.first_name.charAt(0) : "A"}
              className="bg-neutral-600 glow"
              size={28}
            />
          )}
          <div className="ml-2">
            <p className="font-normal text-[13px] flex flex-row gap-1 items-center">
              {user ? `${user.first_name} ${user.last_name}` : "Anonymous"}
              <Chip
                mode="elevated"
                className="bg-white p-1 mt-[3px] text-[8px] rounded-sm flex items-center justify-center text-black h-[12px] w-max"
              >
                <span className="text-black flex items-center justify-center font-medium text-[7px]">
                  You
                </span>
              </Chip>
            </p>
            <p className="text-[10px] text-neutral-600"></p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1"
        >
          <span
            className="border text-center flex items-center gap-1 border-neutral-800 bg-[#131313] rounded-full text-[10px] px-[8px] py-[4px]"
            onClick={() => navigateToAnotherScreen("convert")}
          >
            {userPoints}
            <IoDiamondOutline size={10} />
          </span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default LeaderboardScreen;
