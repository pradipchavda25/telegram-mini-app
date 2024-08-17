import React, { useEffect, useState } from "react";
import { BsSendPlus } from "react-icons/bs";
import { TbCrown, TbGift, TbUserPlus } from "react-icons/tb";
import { LuClipboardCopy } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { IoDiamondOutline } from "react-icons/io5";
import { Button } from "@telegram-apps/telegram-ui";
import useTelegram from "../context/TelegramContext";
import { motion } from "framer-motion";
import { useTab } from "../context/TabContext";
import sharpeLogo from "../images/sharpe-white-logo.svg";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ReferralScreen = ({ userPoints }) => {
  const [copied, setCopied] = useState(false);
  // const [totalFriends, setTotalFriends] = useState(0);
  // const [totalEarn, setTotalEarn] = useState(0);
  const { webApp, user, startParam } = useTelegram();
  const [referralCode, setReferralCode] = useState("");
  const { totalFriends, setTotalFriends } = useTab();

  const earnings = totalFriends * 500;

  useEffect(() => {
    if (user) {
      setReferralCode(generateReferralCode(user.id));
    }
  }, [user]);

  // const fetchReferralData = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://miniapp-backend-4dd6ujjz7q-el.a.run.app/get_refferals?referrer_id=${userId}`
  //     );
  //     const data = await response.json();

  //     const friendCount = data.length;
  //     const earnings = friendCount * 500;

  //     setTotalFriends(friendCount);
  //     setTotalEarn(earnings);
  //   } catch (error) {
  //     console.error("Failed to fetch referral data:", error);
  //   }
  // };

  const generateReferralCode = (userId) => {
    // Generate a unique code based on userId
    return `${userId}`;
  };

  const handleCopyClick = () => {
    const textToCopy = user
      ? `https://t.me/TeleMiniTestBot/hello123Test?startapp=${referralCode}`
      : "http://app.sharpe.ai";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset the icon after 2 seconds
    });
  };

  const handleInviteFriendClick = () => {
    const userRefLink = `https://t.me/TeleMiniTestBot/hello123Test?startapp=${referralCode}`;
    const text = "Join me on Sharpe AI and earn rewards!";
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
      userRefLink
    )}&text=${encodeURIComponent(text)}`;

    webApp.openTelegramLink(telegramLink);
  };

  return (
    <motion.div
      className="relative bg-neutral-950 text-white min-h-screen p-4"
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
        <h1 className="text-2xl font-bold mb-1">Referral</h1>
        <p className="text-neutral-400 text-[16px] px-10 text-center">
          Introduce Sharpe AI to friends and earn $SAI tokens.
        </p>
      </motion.div>

      {/* New Info Cards */}
      <motion.div
        className="mb-4 space-y-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div
          className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-2"
          variants={cardVariants}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="font-semibold text-[16px] mb-1 flex items-center">
            <TbGift className="mr-1" size={14} /> Invite a friend
          </h3>
          <p className="text-[14px] pr-4 text-neutral-400">
            Invite your bros and get more $BROs.
          </p>
        </motion.div>
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
            className="w-10 h-10 bg-gradient-to-l from-[#181818] rounded-lg border border-neutral-800 flex items-center justify-center mr-3"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TbUserPlus color="white" size={22} />
          </motion.div>
          <div>
            <h2 className="font-semibold text-[18px]">Invite a friend</h2>
            <p className="text-[12px] text-neutral-400 flex items-center gap-1">
            Invite your bros and get more $BROs.
            </p>
          </div>
        </div>
        <div className="flex mt-3">
          <Button
            className="flex-grow cursor-pointer text-[14px] px-4 font-medium bg-[#181818] text-white py-2 rounded-[4px] mr-[8px]"
            onClick={handleInviteFriendClick}
          >
            Invite Friend
          </Button>
          <Button
            onClick={handleCopyClick}
            className="cursor-pointer  border border-neutral-600 bg-[#181818] rounded-[4px] flex items-center justify-center"
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
          <p className="text-xl font-bold">{totalFriends ? totalFriends : '-'}</p>
        </motion.div>
        <motion.div
          className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.03 }}
        >
          <p className="text-neutral-500 text-[14px] mb-1">Total Earn</p>
          <p className="text-xl font-bold flex items-center ">
            <img
              src={sharpeLogo}
              alt=""
              style={{ height: "30px", width: "30px" }}
            />
            {earnings ? earnings :'-'}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReferralScreen;
