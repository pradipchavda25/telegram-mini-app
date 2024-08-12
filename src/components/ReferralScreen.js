import React, { useState } from "react";
import { BsSendPlus } from "react-icons/bs";
import { TbUserPlus } from "react-icons/tb";
import { LuClipboardCopy } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { Button } from "@telegram-apps/telegram-ui";
import { IoMdCheckmark } from "react-icons/io";
import useTelegram from "../context/TelegramContext";

const ReferralScreen = ({ userPoints }) => {
  const [copied, setCopied] = useState(false);
  const { webApp, user } = useTelegram();
  console.log("user", user);

  const handleCopyClick = () => {
    const textToCopy = user ? user.id : "http://app.sharpe.ai"; // Replace with the actual referral link
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset the icon after 2 seconds
    });
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-12 h-12 bg-[#98ECFF] rounded-full flex items-center justify-center mb-2">
          <BsSendPlus color="black" size={24} />
        </div>
        <h1 className="text-2xl font-bold mb-1">Referral</h1>
        <p className="text-neutral-400 text-[18px] text-center">
          Introduce Sharpe AI to friends and earn $SAI tokens.
        </p>
      </div>

      {/* Invite Card */}
      <div className="bg-[#101010] border rounded-md border-neutral-700  p-4 mb-4">
        <div className="flex items-center mb-2">
          <div className="w-14 h-10 bg-[#98ECFF] rounded-lg flex items-center justify-center mr-3">
            <TbUserPlus color="black" size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-[16px]">Invite a friend</h2>
            <p className="text-[12px] text-neutral-400">
              +100💎 to each invited friend reach 1000💎
            </p>
          </div>
        </div>
        <div className="flex mt-3">
          <Button className="flex-grow cursor-pointer text-[14px] px-4 font-medium bg-[#98ECFF] text-black py-2  rounded-[4px] mr-[8px]">
            Invite Friend
          </Button>
          <Button
            onClick={handleCopyClick}
            className="cursor-pointer bg-neutral-800 rounded-[4px] flex items-center justify-center"
          >
            {copied ? (
              <IoMdCheckmark color="green" size={20} />
            ) : (
              <LuClipboardCopy color="white" size={20} />
            )}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-4">
          <p className="text-neutral-400 text-[16px] mb-1">Total Friends</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-4">
          <p className="text-neutral-400 text-[16px] mb-1">Total Earn</p>
          <p className="text-2xl font-bold">💎 0</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralScreen;
