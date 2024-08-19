// import { Avatar, Chip } from "@telegram-apps/telegram-ui";
// import { useTab } from "../context/TabContext";
// import useTelegram from "../context/TelegramContext";
// import React, { useEffect } from "react";
// import { IoDiamondOutline } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";
// import { Icon } from "@iconify/react";
// import sharpeLogo from "../images/sharpe-white-logo.svg";

// const LeaderboardScreen = ({ onScreenChange }) => {
//   const { webApp, user } = useTelegram();
//   const { userPoints } = useTab();

//   const navigateToAnotherScreen = (tabName) => {
//     onScreenChange(tabName);
//   };

//   const topUsers = [
//     {
//       name: "Sunusi Danjuma",
//       points: 440700,
//       rank: 2,
//       avatar: "👾",
//       icon: "fluent-emoji:1st-place-medal",
//     },
//     {
//       name: "Vj Rusmayana",
//       points: 452600,
//       rank: 1,
//       avatar: "🤵",
//       icon: "fluent-emoji:2nd-place-medal",
//     },
//     {
//       name: "Chizo_1_german",
//       points: 431300,
//       rank: 3,
//       avatar: "🤖",
//       icon: "fluent-emoji:3rd-place-medal",
//     },
//   ];

//   const otherUsers = [
//     { name: "Tung Nguyen", points: 415100, rank: 4, avatar: "🤖" },
//     { name: "Love Den", points: 411000, rank: 5, avatar: "👾" },
//     { name: "Trân Gia", points: 320900, rank: 6, avatar: "👾" },
//   ];

//   useEffect(() => {
//     const link = document.createElement("link");
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);

//     const style = document.createElement("style");
//     style.textContent = `
//       body {
//         font-family: 'Poppins', sans-serif;
//       }
//       .shimmer {
//         background: linear-gradient(90deg, #181818 0%, #2a2a2a 50%, #181818 100%);
//         background-size: 200% 100%;
//         animation: shimmer 1.5s infinite;
//       }
//       @keyframes shimmer {
//         0% { background-position: -200% 0; }
//         100% { background-position: 200% 0; }
//       }
//       .glow {
//         box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
//       }
//       .pulse {
//         animation: pulse 2s infinite;
//       }
//       @keyframes pulse {
//         0% { transform: scale(1); }
//         50% { transform: scale(1.05); }
//         100% { transform: scale(1); }
//       }
//       .floating {
//         animation: floating 3s ease-in-out infinite;
//       }
//       @keyframes floating {
//         0% { transform: translateY(0px); }
//         50% { transform: translateY(-4px); }
//         100% { transform: translateY(0px); }
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-neutral-950 text-white min-h-screen p-4 flex flex-col"
//     >
//       {/* Total Users */}
//       <motion.div
//         // whileHover={{ scale: 1.05 }}
//         className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-3 mb-4 shimmer"
//       >
//         <p className="text-neutral-400 text-center mb-1 text-[16px]">
//           Total Users
//         </p>
//         <motion.p
//           className="text-2xl font-bold text-center"
//           style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           2,171,991
//         </motion.p>
//       </motion.div>

//       {/* Section: Your Position */}
//       <motion.div
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div
//           whileHover={{ scale: 1.02, backgroundColor: "#2a2a2a" }}
//           whileTap={{ scale: 0.98 }}
//           transition={{ duration: 0.3 }}
//           className="bg-[#181818] border rounded-md border-neutral-800 p-2 mb-4 flex justify-between items-center"
//         >
//           <div className="flex flex-row items-center gap-2">
//             <motion.div
//               className="bg-[#131313] border text-[12px] border-neutral-800 p-2 rounded-full"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//             >
//               🤖
//             </motion.div>
//             <div>
//               <p className="font-semibold text-[14px] flex flex-row items-center gap-1">
//                 {user ? `${user.first_name} ${user.last_name}` : "Anonymous"}
//                 <Chip
//                   mode="elevated"
//                   className="bg-white p-1 text-[8px] rounded-sm flex items-center justify-center text-black h-[12px] w-max"
//                 >
//                   <span className="text-black font-bold flex items-center justify-center  text-[7px]">
//                     You
//                   </span>
//                 </Chip>
//               </p>
//               <p className="text-[14px] flex items-center mt-[1px] text-neutral-400">
//                 {userPoints}
//                 <motion.div>
//                   {/* <IoDiamondOutline size={10} /> */}
//                   <img
//                     src={sharpeLogo}
//                     alt=""
//                     style={{ height: "22px", width: "22px" }}
//                   />
//                 </motion.div>
//               </p>
//             </div>
//           </div>
//           <span className="text-center flex items-center gap-1 rounded-sm text-[14px] px-[8px] py-[4px]">
//             #3453
//           </span>
//         </motion.div>
//       </motion.div>

//       {/* Separator Line */}
//       <motion.hr
//         className="border-neutral-800 mb-4"
//         initial={{ scaleX: 0 }}
//         animate={{ scaleX: 1 }}
//         transition={{ duration: 0.5 }}
//       />

//       {/* Section: Top Users */}
//       <AnimatePresence>
//         {topUsers.map((user, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.02, backgroundColor: "#2a2a2a" }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ duration: 0.3 }}
//               className="bg-gradient-to-r from-[#181818] to-black border rounded-md border-neutral-800 p-2 mb-1 flex justify-between items-center"
//             >
//               <div className="flex flex-row items-center gap-2">
//                 <motion.div
//                   className="bg-[#131313] border text-[12px] border-neutral-800 p-2 rounded-full"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {user.avatar}
//                 </motion.div>
//                 <div>
//                   <p className="font-semibold text-[14px] ">{user.name}</p>
//                   <p className="text-[12px] flex items-center mt-[1px] text-neutral-400">
//                     {user.points}
//                     <motion.div>
//                       {/* <IoDiamondOutline size={10} /> */}
//                       <img
//                         src={sharpeLogo}
//                         alt=""
//                         style={{ height: "20px", width: "20px" }}
//                       />
//                     </motion.div>
//                   </p>
//                 </div>
//               </div>
//               <motion.span
//                 className="text-center flex items-center gap-1 rounded-sm text-[12px] px-[8px] py-[4px]"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Icon
//                   icon={user.icon}
//                   width="24"
//                   height="24"
//                   className="floating"
//                 />
//               </motion.span>
//             </motion.div>
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       <AnimatePresence>
//         {otherUsers.map((user, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{
//               duration: 0.5,
//               delay: (index + topUsers.length) * 0.1,
//             }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.02, backgroundColor: "#2a2a2a" }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ duration: 0.3 }}
//               className="bg-gradient-to-r from-[#181818] to-black border rounded-md border-neutral-800 p-2 mb-1 flex justify-between items-center"
//             >
//               <div className="flex flex-row items-center gap-2">
//                 <motion.div
//                   className="bg-[#131313] border text-[12px] border-neutral-800 p-2 rounded-full"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {user.avatar}
//                 </motion.div>
//                 <div>
//                   <p className="font-semibold text-[14px]">{user.name}</p>
//                   <p className="text-[12px] flex items-center mt-[1px] text-neutral-400">
//                     {user.points}
//                     <motion.div>
//                       <img
//                         src={sharpeLogo}
//                         alt=""
//                         style={{ height: "20px", width: "20px" }}
//                       />
//                     </motion.div>
//                   </p>
//                 </div>
//               </div>
//               <motion.span
//                 className="text-center flex items-center gap-1 rounded-sm text-[14px] px-[8px] py-[4px]"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 #{user.rank}
//               </motion.span>
//             </motion.div>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default LeaderboardScreen;

import React from "react";
import { motion } from "framer-motion";

const LeaderboardScreen = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-start p-4 pt-6">
      <motion.h1
        className="text-3xl text-white font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Leaderboard
      </motion.h1>

      <motion.div
        className="w-full max-w-md bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800  shadow-lg p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Coming Soon!</h2>
        <p className="text-neutral-400 mb-6">
          Our leaderboard is under construction. Get ready for some epic
          competition!
        </p>

        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-gradient-to-r from-[#181818] to-black border rounded-md border-neutral-800 p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#181818] rounded-full mr-3"></div>
                <div className="h-4 w-24 bg-[#181818] rounded"></div>
              </div>
              <div className="h-4 w-12 bg-[#181818] rounded"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardScreen;
