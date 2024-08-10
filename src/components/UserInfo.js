import React from "react";
import useTelegram from "../context/TelegramContext";
import { Avatar } from "@telegram-apps/telegram-ui";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import { useTab } from "../context/TabContext";

export default function UserInfo() {
  const { webApp, user } = useTelegram();
  const { setCurrentTab } = useTab();

  return (
    <div className="flex items-center bg-[#0c0c0c] px-2 py-2 justify-between">
      <div className="flex items-center">
        {user && user.photo_url ? (
          <Avatar className="bg-neutral-600" src={user.photo_url} size={40} />
        ) : (
          <Avatar
            acronym={user ? user.first_name.charAt(0) : "A"}
            className="bg-neutral-600"
            size={40}
          />
        )}{" "}
        <div className="ml-2">
          <p className="font-semibold text-[15px]">
            {user ? `${user.first_name} ${user.last_name}` : "Anonymous"}
          </p>
          <p className="text-[10px] text-neutral-600">Wallet: Not Created</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="border text-center border-neutral-800 bg-[#131313] rounded-full text-[10px] px-[8px] py-[4px]" onClick={() => setCurrentTab('convert')}>
          💎 500
        </span>
        <span className="border flex flex-row gap-1 text-center border-neutral-800 bg-[#131313] rounded-full text-[10px] px-[8px] py-[4px]" onClick={() => setCurrentTab('convert')}>
          {" "}
          <img
            src={sharpeLogo}
            alt=""
            style={{ height: "12px", width: "12px", marginTop: "2px" }}
          />{" "}
          0
        </span>
      </div>
    </div>
  );
}
