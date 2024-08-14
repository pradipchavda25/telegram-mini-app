import React, { useEffect, useState } from "react";
import { BsSendPlus } from "react-icons/bs";
import { TbUserPlus } from "react-icons/tb";
import { LuClipboardCopy } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { IoDiamondOutline } from "react-icons/io5";
import { Button } from "@telegram-apps/telegram-ui";
import useTelegram from "../context/TelegramContext";
import { motion } from "framer-motion";

const ReferralScreen = ({ userPoints }) => {
  const [copied, setCopied] = useState(false);
  const { webApp, user, startParam } = useTelegram();
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    if (user) {
      setReferralCode(generateReferralCode(user.id));
    }

    // // Handle incoming referral
    // if (startParam) {
    //   handleIncomingReferral(startParam);
    // }
  }, [user, startParam]);

  const generateReferralCode = (userId) => {
    // Generate a unique code based on userId
    return `REF${userId}`;
  };

  const handleCopyClick = () => {
    const textToCopy = user ? `https://t.me/TeleMiniTestBot/app?startapp=${referralCode}` : "http://app.sharpe.ai";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset the icon after 2 seconds
    });
  };

  return (
    <motion.div 
      className="bg-neutral-950 text-white min-h-screen p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col items-center mb-4"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* <motion.div 
          className="w-12 h-12 bg-gradient-to-l border border-neutral-800 from-[#181818] to-black rounded-full flex items-center justify-center mb-2"
          whileHover={{ scale: 1.1, rotate: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <BsSendPlus color="white" size={20} />
        </motion.div> */}
        <h1 className="text-xl font-bold mb-1">Referral</h1>
        <p className="text-neutral-400 text-[14px] px-8 text-center">
          Introduce Sharpe AI to friends and earn $SAI tokens.
        </p>
      </motion.div>

      {/* Invite Card */}
      <motion.div 
        className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-4 mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center mb-2">
          <motion.div 
            className="w-14 h-10 bg-gradient-to-l from-[#181818] rounded-lg border border-neutral-800 flex items-center justify-center mr-3"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TbUserPlus color="white" size={22} />
          </motion.div>
          <div>
            <h2 className="font-semibold text-[16px]">Invite a friend</h2>
            <p className="text-[12px] text-neutral-400 flex items-center gap-1">
              100 diamonds to each invited friend reach 1000
            </p>
          </div>
        </div>
        <div className="flex mt-3">
          <Button className="flex-grow cursor-pointer text-[14px] px-4 font-medium bg-[#181818] text-white py-2 rounded-[4px] mr-[8px]">
            Invite Friend
          </Button>
          <Button
            onClick={handleCopyClick}
            className="cursor-pointer bg-gradient-to-r border border-neutral-600 from-[#181818] to-black rounded-[4px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <IoMdCheckmark color="green" size={20} />
            ) : (
              <LuClipboardCopy color="green" size={20} />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-2 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.03 }}
        >
          <p className="text-neutral-500 text-[14px] mb-1">Total Friends</p>
          <p className="text-xl font-bold">0</p>
        </motion.div>
        <motion.div 
          className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.03 }}
        >
          <p className="text-neutral-500 text-[14px] mb-1">Total Earn</p>
          <p className="text-xl font-bold flex items-center gap-1">
            <IoDiamondOutline size={18}/>0
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReferralScreen;
