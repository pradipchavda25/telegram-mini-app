import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banner } from "@telegram-apps/telegram-ui";
import UserInfo from "../components/UserInfo";
import { FiUserCheck } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import { TbCalendarClock } from "react-icons/tb";
import { useTab } from "../context/TabContext";
import { MdArrowForwardIos } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";

const HomeScreen = ({ onScreenChange, userPoints }) => {
  const { setCurrentTab, completedTasks } = useTab();

  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
    setCurrentTab(tabName);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.div
      className="relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <UserInfo onScreenChange={onScreenChange} userPoints={userPoints} />
      <motion.div variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <Banner
            className="h-[110px] flex justify-center m-4 py-8 rounded-md items-center text-center bg-gradient-to-b from-[#141414] to-black relative overflow-hidden"
            type="section"
          >
            <div className="w-full z-10 relative">
              <motion.p
                className="text-[16px] font-medium text-center text-neutral-500"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Total Prize Pool
              </motion.p>
              <motion.p
                className="text-2xl text-center font-bold"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                10,000,000 $SAI
              </motion.p>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </Banner>
        </motion.div>
      </motion.div>
      <motion.div className="p-2 px-3" variants={itemVariants}>
        <motion.div
          className="bg-gradient-to-r from-[#181818] to-black border border-neutral-800 rounded-md p-4 flex flex-row justify-between items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div>
            <p className="font-medium text-[12px] flex items-center gap-1">
              <IoDiamondOutline size={10} /> to $SAI
            </p>
            <p className="text-[10px] text-neutral-400 pr-2">
              The more Diamonds you own, the more $SAI allocation you have.
            </p>
          </div>
          <motion.button
            className="flex-grow flex flex-row justify-center gap-1 items-center cursor-pointer text-[13px] px-2 font-normal bg-[#131313] text-[#fff] py-[8px] border border-neutral-800 rounded-[4px]"
            onClick={() => navigateToAnotherScreen("convert")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Convert
            <MdArrowForwardIos
              size={8}
              color="grey"
              style={{ marginTop: "2px" }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div className="px-3 pb-2" variants={containerVariants}>
        <AnimatePresence>
          {[
            {
              name: "Onboarding",
              progress: "0/1 tasks done",
              reward: 500,
              tab: "onboarding",
              icon: FiUserCheck,
            },
            {
              name: "Basic Task",
              progress: "0/3 tasks done",
              reward: 1500,
              tab: "basictasks",
              icon: GoTasklist,
            },
            {
              name: "Daily Task",
              progress: "0/2 tasks done",
              reward: 6500,
              tab: "dailytasks",
              icon: TbCalendarClock,
            },
          ].map((task, index) => {
            const Icon = task.icon;
            return (
              <motion.div
                key={index}
                onClick={() => navigateToAnotherScreen(task.tab)}
                className="bg-gradient-to-r cursor-pointer from-[#181818] to-black border rounded-md border-neutral-800 p-2 mb-2 flex justify-between items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                layout
              >
                <div className="flex flex-row items-center gap-2">
                  <motion.div
                    className="bg-[#131313] border border-neutral-800 p-2 rounded-md"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-[14px]">{task.name}</p>
                    <p className="text-[12px] text-neutral-400">
                      {task.progress}
                    </p>
                  </div>
                </div>
                <motion.span
                  className="text-center flex items-center gap-1 bg-[#1d1d1d] rounded-full text-[12px] px-[8px] py-[4px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +{task.reward}
                  <IoDiamondOutline size={10} />
                </motion.span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default HomeScreen;
