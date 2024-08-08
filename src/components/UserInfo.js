import React from "react";
import useTelegram from "../context/TelegramContext";

export default function UserInfo() {
  const { webApp, user } = useTelegram();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        {/* <div className="bg-neutral-800 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
            PR
          </div> */}
        <div className="ml-2">
          <p className="font-semibold text-[15px]">{user ? `${user.first_name} ${user.last_name}` : 'Anonymous'}</p>
          <p className="text-[13px] text-gray-400">Wallet: Not Created</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">💎 500</span>
        <span>🕒 0</span>
      </div>
    </div>
  );
}
