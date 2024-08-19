import { Tabbar } from "@telegram-apps/telegram-ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useTelegram from "../context/TelegramContext";
import HomeScreen from "../components/HomePage";
import { useTab } from "../context/TabContext";
import OnboardingScreen from "../components/OnboardingScreen";
import ReferralScreen from "../components/ReferralScreen";
import BasicTaskScreen from "../components/BasicTaskScreen";
import LeaderboardScreen from "../components/LeaderboardScreen";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import ConvertScreen from "../components/ConvertScreen";
import CompanyInfoScreen from "../components/CompanyInfoScreen";
import { IoChatbubbleEllipsesOutline, IoHomeOutline } from "react-icons/io5";
import { TbUsersPlus } from "react-icons/tb";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import DailyTasks from "../components/DailyTasks";
import CoinCard from "../components/CoinCard";
import SolanaAICard from "../components/SolanaAIOperatingLayer";
import TokenomicsScreen from "../components/Tokemonics";
import SaiTokenScreen from "../components/SaiTokenScreen";
import { AnimatePresence, motion } from "framer-motion";
import UserInfo from "../components/UserInfo";
import Confetti from "react-confetti-boom";
import Notification from "../components/notification/Notification";
import ChatUI from "../components/ChatScreen";
import { BsChatRightText } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import KonstaTabbar from "../components/KonstaTabbar";
import triggerHapticFeedback from "../utils/hapticUtils";

const tabs = [
  { id: "home", text: "Home", Icon: IoHomeOutline },
  { id: "referral", text: "Referral", Icon: TbUsersPlus },
  { id: "leaderboard", text: "Leaderboard", Icon: MdOutlineLeaderboard },
  { id: "info", text: "Info", Icon: MdInfoOutline },
  { id: "chat", text: "Chat", Icon: HiOutlineChatBubbleLeftRight },
];

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    transition: { duration: 0.8, ease: "easeIn" },
  },
};

const AnimatedIcon = ({ Icon, color }) => (
  <motion.div className="flex items-center justify-center" style={{ color }}>
    <Icon color={color} />
  </motion.div>
);

export default function HomeNew() {
  const [screenHistory, setScreenHistory] = useState(["home"]);
  const [showLogo, setShowLogo] = useState(true);
  const [taskStatusData, setTaskStatusData] = useState([]);
  const {
    currentTab,
    setCurrentTab,
    userPoints,
    setUserPoints,
    totalFriends,
    setTotalFriends,
  } = useTab();
  const { webApp, user, startParam } = useTelegram();
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referralProcessed, setReferralProcessed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [startParamLoaded, setStartParamLoaded] = useState(false);
  const [isReferralHandled, setIsReferralHandled] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });
  const userId = user.id 
  const mainTabs = ["home", "referral", "leaderboard", "info", "chat"];
  const ApiBaseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PUBLIC_API_URL
      : process.env.REACT_APP_PUBLIC_LOCAL_API_URL;

  useEffect(() => {
    const checkStartParam = () => {
      if (
        webApp &&
        webApp.initDataUnsafe &&
        webApp.initDataUnsafe.start_param
      ) {
        setStartParamLoaded(true);
      } else if (startParam !== null) {
        setStartParamLoaded(true);
      }
    };

    checkStartParam();

    const intervalId = setInterval(() => {
      checkStartParam();
    }, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setStartParamLoaded(true);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [webApp, startParam]);

  useEffect(() => {
    if (startParamLoaded && startParam && !referralProcessed) {
      if (!showLogo) {
        setShowReferralPopup(true);
      }
    } else if (startParamLoaded && !startParam) {
      setReferralProcessed(true);
    }
  }, [startParamLoaded, startParam, referralProcessed, showLogo]);

  const initializeApp = useCallback(async () => {
    console.log("userId:", userId);
    if (startParamLoaded) {
      if (startParam && userId && !referralProcessed) {
        console.log("Waiting for referral confirmation");
      } else {
        console.log("No startParam or referral already processed");
        setReferralProcessed(true);
        if (!startParam) {
          await fetchData();
        }
      }
      setIsInitialized(true);
    }
  }, [startParamLoaded, startParam, userId, referralProcessed]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp, startParamLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      if (!startParam) {
        fetchData();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [startParam]);

  const handleScreenChange = (newScreen) => {
    if (newScreen !== currentTab) {
      triggerHapticFeedback("success");
      if (mainTabs.includes(newScreen)) {
        setScreenHistory([newScreen]);
      } else {
        setScreenHistory((prevHistory) => [...prevHistory, newScreen]);
      }
      setCurrentTab(newScreen);
    }
  };

  const handleBackButton = () => {
    if (screenHistory.length > 1) {
      const newHistory = screenHistory.slice(0, -1);
      setScreenHistory(newHistory);
      setCurrentTab(newHistory[newHistory.length - 1]);
    }
  };

  useEffect(() => {
    if (currentTab === "home" && isReferralHandled && !showLogo) {
      fetchTaskStatus();
    }
  }, [currentTab, isReferralHandled, showLogo]);

  useEffect(() => {
    // Check if startParam is not available (null or undefined)
    if (startParam === undefined || startParam === null) {
      setIsReferralHandled(true);
    } else {
      setIsReferralHandled(false);
    }
  }, [startParam]);

  useEffect(() => {
    if (webApp) {
      const showBackButton =
        screenHistory.length > 1 && !mainTabs.includes(currentTab);

      if (showBackButton) {
        webApp.BackButton.show();
        webApp.onEvent("backButtonClicked", handleBackButton);
      } else {
        webApp.BackButton.hide();
      }

      return () => {
        if (showBackButton) {
          webApp.offEvent("backButtonClicked", handleBackButton);
        }
        webApp.BackButton.hide();
      };
    }
  }, [webApp, screenHistory, currentTab]);

  const fetchData = async () => {
    console.log("Fetching data...");
    await Promise.all([
      fetchTaskStatus(),
      fetchUserPoints(),
      fetchReferralData(),
    ]);
  };

  const fetchTaskStatus = async () => {
    try {
      const response = await fetch(
        `${ApiBaseUrl}/get_tasks?unique_id=${userId}`,
        { method: "GET" }
      );
      const data = await response.json();
      setTaskStatusData(data);
    } catch (error) {
      console.error("Error fetching task status:", error);
      setTaskStatusData(null);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`${ApiBaseUrl}/get_points`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unique_id: userId }),
      });
      const data = await response.json();
      if (data) {
        setUserPoints(data.points);
      } else {
        throw new Error(data.message || "Failed to fetch user points");
      }
    } catch (error) {
      console.error("Error fetching user points:", error);
    }
  };

  const fetchReferralData = async () => {
    try {
      const response = await fetch(
        `${ApiBaseUrl}/get_refferals?referrer_id=${userId}`
      );
      const data = await response.json();

      const friendCount = data.length;
      const earnings = friendCount * 500;

      setTotalFriends(friendCount);
      // setTotalEarn(earnings);
    } catch (error) {
      console.error("Failed to fetch referral data:", error);
    }
  };

  const handleReferralConfirmation = async (confirmed) => {
    setShowReferralPopup(false);
    if (confirmed && startParam) {
      try {
        const response = await fetch(
          `${ApiBaseUrl}/add_refferal?referrer_id=${startParam}&referee_id=${userId}`,
          { method: "GET" }
        );
        const data = await response.json();
        console.log("Referral added:", data);

        if (data.msg === "User already exists!") {
          setNotification({
            show: true,
            type: "info",
            title: "Already Referred",
            message: "You are already referred",
          });
        triggerHapticFeedback("error");
        } else {
          setShowConfetti(true);
          setNotification({
            show: true,
            type: "success",
            title: "Referral Successful",
            message: "You have successfully joined using a referral link!",
          });
          setTimeout(() => setShowConfetti(false), 3000);
          triggerHapticFeedback("success");
        }
      } catch (error) {
        console.error("Error adding referral:", error);
        setNotification({
          show: true,
          type: "error",
          title: "Referral Failed",
          message:
            "There was an error processing your referral. Please try again.",
        });
        triggerHapticFeedback("error");
      }
    }
    setIsReferralHandled(true);
    setReferralProcessed(true);
    await fetchData(); // Fetch data after referral process
  };

  const ReferralPopup = ({ onConfirm, onReject }) => {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-gradient-to-b border border-neutral-800 from-[#181818] to-black p-4 rounded-lg shadow-lg w-[300px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h2 className="text-lg font-bold mb-2 text-white">
            Join with Referral
          </h2>
          <p className="mb-3 text-[14px] text-gray-300">
            Do you want to join using this referral link?
          </p>
          <div className="flex justify-end space-x-1">
            <button
              onClick={onReject}
              className="px-3 py-1 cursor-pointer font-medium text-[13px] bg-[#2d2d2d] text-[#fff] border border-neutral-800 rounded-[4px]"
            >
              Decline
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1 cursor-pointer font-medium text-[13px] bg-[#fff] text-[#000] border border-neutral-800 rounded-[4px]"
            >
              Accept
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderContent = () => {
    const props = {
      onScreenChange: handleScreenChange,
      userPoints: userPoints,
      taskStatusData: taskStatusData,
      totalFriends: totalFriends,
    };

    switch (currentTab) {
      case "home":
        return <HomeScreen {...props} />;
      case "referral":
        return <ReferralScreen {...props} />;
      case "onboarding":
        return <OnboardingScreen {...props} />;
      case "basictasks":
        return <BasicTaskScreen {...props} />;
      case "dailytasks":
        return <DailyTasks {...props} />;
      case "convert":
        return <ConvertScreen {...props} />;
      case "leaderboard":
        return <LeaderboardScreen {...props} />;
      case "info":
        return <CompanyInfoScreen {...props} />;
      case "sitecard":
        return <SolanaAICard {...props} />;
      case "tokenomics":
        return <TokenomicsScreen {...props} />;
      case "saitoken":
        return <SaiTokenScreen {...props} />;
      case "chat":
        return <ChatUI {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950">
      {showLogo || !isInitialized ? (
        <motion.div
          className="logo-div flex flex-1 justify-center flex-col items-center"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <img
            src={sharpeLogo}
            alt=""
            style={{ height: "90px", width: "auto" }}
          />
        </motion.div>
      ) : (
        <>
          {(currentTab === "home" ||
            currentTab === "basictasks" ||
            currentTab === "onboarding" ||
            currentTab === "dailytasks") && (
            <UserInfo
              onScreenChange={handleScreenChange}
              userPoints={userPoints}
            />
          )}
          <motion.div
            className="flex-grow overflow-y-auto"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            key={currentTab}
          >
            {renderContent()}
          </motion.div>
          <KonstaTabbar
            currentTab={currentTab}
            handleScreenChange={handleScreenChange}
          />
        </>
      )}
      {showReferralPopup && (
        <ReferralPopup
          onConfirm={() => handleReferralConfirmation(true)}
          onReject={() => handleReferralConfirmation(false)}
        />
      )}

      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Notification
              show={notification.show}
              setShow={(show) => setNotification((prev) => ({ ...prev, show }))}
              type={notification.type}
              title={notification.title}
              message={notification.message}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti
              mode="boom"
              particleCount={400}
              shapeSize={20}
              launchSpeed={1.5}
              colors={["#98ecff", "#ff577f", "#ff884b", "#fff9b0"]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
