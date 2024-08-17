import React from "react";
import useTelegram from "../context/TelegramContext";
import { Avatar } from "@telegram-apps/telegram-ui";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import { useTab } from "../context/TabContext";
import { IoDiamondOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function UserInfo({ onScreenChange }) {
  const { webApp, user } = useTelegram();
  const { currentTab, setCurrentTab, userPoints } = useTab();

  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
    setCurrentTab(tabName);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex items-center bg-gradient-to-t from-[#171717] to-black px-2 py-3 justify-between border-b border-neutral-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center" variants={itemVariants}>
        <AnimatePresence>
          {user && user.photo_url ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="bg-neutral-600" src={user.photo_url} size={28} />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                acronym={user ? user.first_name.charAt(0) : "A"}
                className="bg-neutral-600"
                size={28}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div className="ml-2" variants={itemVariants}>
          <motion.p
            className="font-semibold text-white text-[11px]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {user ? `${user.first_name} ${user.last_name}` : "Anonymous"}
          </motion.p>
        </motion.div>
      </motion.div>
      {/* <motion.div className="flex items-center gap-1" variants={itemVariants}>
        <motion.span
          className="text-center flex items-center gap-1 bg-[#1d1d1d] rounded-full text-[12px] px-[8px] py-[4px] cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "#2c2c2c" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateToAnotherScreen("convert")}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {userPoints}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <IoDiamondOutline size={10} />
          </motion.span>
        </motion.span>
        <motion.span
          className="text-center flex items-center gap-1 bg-[#1d1d1d] rounded-full text-[12px] px-[10px] py-[4px] cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "#2c2c2c" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateToAnotherScreen("convert")}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            0
          </motion.span>
          <motion.img
            src={sharpeLogo}
            alt=""
            style={{ height: "12px", width: "12px", marginTop: "0px" }}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
        </motion.span>
      </motion.div> */}
    </motion.div>
  );
}