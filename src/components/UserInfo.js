import React from "react";
import { Navbar, Link } from "konsta/react";
import useTelegram from "../context/TelegramContext";
import { Avatar } from "@telegram-apps/telegram-ui";
import { useTab } from "../context/TabContext";
import { IoDiamondOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function UserInfoNavbar({ onScreenChange }) {
  const { user } = useTelegram();
  const { setCurrentTab, userPoints } = useTab();

  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
    setCurrentTab(tabName);
  };

  return (
    <Navbar
      style={{ width: "100%", paddingTop: '5px', paddingBottom: '5px' }}
      colors={{
        bgIos: '#101010',
        bgMaterial: '#101010',
        textIos: '#ffffff',
        textMaterial: '#ffffff',
      }}
      title={
        <div className="flex items-center justify-start">
          <>
            {user && user.photo_url ? (
              <div>
                <Avatar
                  className="bg-neutral-600"
                  src={user.photo_url}
                  size={28}
                />
              </div>
            ) : (
              <div>
                <Avatar
                  acronym={user ? user.first_name.charAt(0) : "A"}
                  className="bg-neutral-600"
                  size={28}
                />
              </div>
            )}
          </>
          <div className="ml-2">
            <p className="font-semibold text-white text-[11px]">
              {user ? `${user.first_name} ${user.last_name}` : "Anonymous"}
            </p>
          </div>
        </div>
      }
      // right={
      //   <Link onClick={() => navigateToAnotherScreen("convert")}>
      //     <span
      //       className="text-center flex items-center gap-1 bg-[#1d1d1d] rounded-full text-[12px] px-[8px] py-[4px]"
      //       whileHover={{ scale: 1.1, backgroundColor: "#2c2c2c" }}
      //       whileTap={{ scale: 0.95 }}
      //     >
      //       <span
      //         initial={{ opacity: 0, scale: 0 }}
      //         animate={{ opacity: 1, scale: 1 }}
      //         transition={{ delay: 0.3, duration: 0.3 }}
      //       >
      //         {userPoints}
      //       </span>
      //       <span
      //         initial={{ opacity: 0, rotate: -180 }}
      //         animate={{ opacity: 1, rotate: 0 }}
      //         transition={{ delay: 0.4, duration: 0.3 }}
      //       >
      //         <IoDiamondOutline size={10} />
      //       </span>
      //     </span>
      //   </Link>
      // }
      className="bg-ios-dark-surface border-b border-neutral-800"
    />
  );
}
