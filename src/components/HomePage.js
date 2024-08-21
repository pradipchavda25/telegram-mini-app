import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banner } from "@telegram-apps/telegram-ui";
import UserInfo from "../components/UserInfo";
import { FiUserCheck } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import { TbCalendarClock } from "react-icons/tb";
import { useTab } from "../context/TabContext";
import { MdArrowForwardIos } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import useTelegram from "../context/TelegramContext";
import Slider from "./Slider";
import { Preloader } from "konsta/react";

const basicTasks = [
  {
    followed_Brownianxyz: 500,
    followed_HiveIntellegence: 200,
    followed_JoinFirefly: 200,
    followed_SharpeIntern: 200,
    followed_SharpeSignals: 200,
    followed_SharpeLabs: 500,
    join_sharpe_discord: 200,
    join_sharpe_telegram: 200,
    join_sharpe_telegram_ac: 200,
    join_sharpe_youtube: 200,
    join_brownian_telegram: 200,
    join_brownian_telegram_ac: 200,
    join_brownian_youtube: 200,
    added_bro_x_username: 500,
    added_bro_tg_username: 500,
  }
];

const dailyTasks = [
  {
    liked_tweet: 100,
    retweeted: 100,
    tweet_bro: 100,
  }
];

const onBoardingTasks = ["signed_up"];

const HomeScreen = ({
  onScreenChange,
  userPoints,
  taskStatusData,
  totalFriends,
}) => {
  const { setCurrentTab, completedTasks } = useTab();
  const { webApp, startParam } = useTelegram();
  console.log("taskStatusData",userPoints, taskStatusData);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBasicTasks, setTotalBasicTasks] = useState(0);
  const [completedBasicTasks, setCompletedBasicTasks] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalDailyTasks, setTotalDailyTasks] = useState(0);
  const [completedDailyTasks, setCompletedDailyTasks] = useState(0);
  const [totalOnboardingTasks, setTotalOnboardingTasks] = useState(0);
  const [completedOnboardingTasks, setCompletedOnboardingTasks] = useState(0);
  const [trueTaskCount, setTrueTaskCount] = useState(0);
  const [totalDailyTasksPoints, setTotalDailyTasksPoints] = useState(0);

  useEffect(() => {
    if (totalFriends && taskStatusData) {
      setIsLoading(true);
      
      // Perform calculations
      setTotalBasicTasks(Object.keys(basicTasks[0]).length);
      setCompletedBasicTasks(Object.keys(basicTasks[0]).filter((task) => taskStatusData[task]).length);
      setTotalPoints(Object.values(basicTasks[0]).reduce((sum, points) => sum + points, 0));
      
      setTotalDailyTasks(Object.keys(dailyTasks[0]).length);
      setCompletedDailyTasks(Object.keys(dailyTasks[0]).filter((task) => taskStatusData[task]).length);
      
      setTotalOnboardingTasks(onBoardingTasks.length);
      setCompletedOnboardingTasks(taskStatusData ? onBoardingTasks.filter((task) => taskStatusData[task]).length : 0);
      
      setTrueTaskCount(taskStatusData ? Object.values(taskStatusData).filter((status) => status === true).length : 0);
      
      setTotalDailyTasksPoints(Object.values(dailyTasks[0]).reduce((sum, points) => sum + points, 0));

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [totalFriends, taskStatusData]);


  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
    setCurrentTab(tabName);
  };

  useEffect(() => {
    if (totalFriends && taskStatusData) {
      setIsLoading(false);
    }
  }, [totalFriends, taskStatusData]);

  const stats = [
    {
      name: "Quest Completed",
      value: `${trueTaskCount ? trueTaskCount : "-"}`,
    },
    { name: "BROs Invited", value: `${totalFriends ? totalFriends : "-"}` },
  ];

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
      className="relative text-white min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Preloader colors={{iconIos: 'text-primary'}} />
        </div>
      ) : (
        <>
      {/* <UserInfo onScreenChange={onScreenChange} userPoints={userPoints} /> */}
      <motion.div
        className="bg-[#0c0c0c] border rounded-[8px] border-neutral-950 m-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="mx-auto rounded-[8px]">
          <div className="grid grid-cols-2 rounded-[8px] gap-px">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                className={`${
                  index === 0
                    ? "bg-gradient-to-r border-r border-neutral-800 rounded-l-lg"
                    : index === 1
                    ? "bg-gradient-to-l border-neutral-800 rounded-r-lg"
                    : ""
                } from-[#181818] to-black px-2 py-2`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-[15px] text-center text-neutral-500 font-medium">
                  {stat.name}
                </p>
                <p className="mt-1 flex justify-center gap-x-2">
                  <span className="text-[22px] flex items-center gap-1 font-semibold tracking-tight text-center text-white">
                    {stat.value}
                    {/* {index === 0 && (
                      <IoDiamondOutline
                        size={14}
                        style={{ marginTop: "2px" }}
                      />
                    )} */}
                    {/* {index === 1 && (
                      <motion.img
                        src={sharpeLogo}
                        alt=""
                        style={{ height: "16px", width: "16px" }}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    )} */}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <Banner
            className="h-[110px] flex justify-center mx-3 my-2 py-8 rounded-md items-center text-center bg-gradient-to-b from-[#141414] to-black relative overflow-hidden"
            type="section"
          >
            <div className="w-full z-10 relative">
              <motion.p
                className="text-[16px] font-medium text-center text-neutral-500"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                TOTAL $BRO EARNED
              </motion.p>
              <motion.p
                className="text-2xl text-center flex flex-row items-center justify-center font-bold"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {userPoints}
                <img
                  src={sharpeLogo}
                  alt=""
                  style={{ height: "36px", width: "36px", marginTop: "4px" }}
                />
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
      <motion.div
        className="mx-3 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Slider />
      </motion.div>
      {/* <motion.div className="p-2 px-3" variants={itemVariants}>
        <motion.div
          className="bg-gradient-to-r from-[#181818] to-black border border-neutral-800 rounded-md p-4 flex flex-row justify-between items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div>
            <p className="font-medium text-[16px] flex items-center gap-1">
              <IoDiamondOutline size={10} /> to $SAI
            </p>
            <p className="text-[14px] text-neutral-400 pr-2">
              The more Diamonds you own, the more $SAI allocation you have.{" "}
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
      </motion.div> */}
      <motion.div className="px-3 pb-2" variants={containerVariants}>
        <AnimatePresence>
          {[
            {
              name: "Onboarding",
              progress: `${completedOnboardingTasks}/${totalOnboardingTasks} tasks done`,
              reward: `${totalOnboardingTasks * 500}`,
              tab: "onboarding",
              icon: FiUserCheck,
            },
            {
              name: "Basic Task",
              progress: `${completedBasicTasks}/${totalBasicTasks} tasks done`,
              reward: `${totalPoints}`,
              tab: "basictasks",
              icon: GoTasklist,
            },
            {
              name: "Daily Task",
              progress:  `${completedDailyTasks}/${totalDailyTasks} tasks done`,
              reward: totalDailyTasksPoints,
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
                    <p className="font-semibold text-[16px]">{task.name}</p>
                    <p className="text-[14px] text-neutral-400">
                      {task.progress}
                    </p>
                  </div>
                </div>
                <motion.span
                  className="text-center flex items-center bg-[#1d1d1d] rounded-full text-[16px] px-[8px] py-[4px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +{task.reward}
                  {/* <IoDiamondOutline size={10} /> */}
                  <img
                    src={sharpeLogo}
                    alt=""
                    style={{ height: "24px", width: "24px" }}
                  />
                </motion.span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      </>
      )}
    </motion.div>
  );
};

export default HomeScreen;
