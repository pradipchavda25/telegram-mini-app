import { Tabbar } from "@telegram-apps/telegram-ui";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import React, { useEffect, useState } from "react";
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
import { IoHomeOutline } from "react-icons/io5";
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

const tabs = [
  { id: "home", text: "Home", Icon: IoHomeOutline },
  { id: "referral", text: "Referral", Icon: TbUsersPlus },
  { id: "leaderboard", text: "Leaderboard", Icon: MdOutlineLeaderboard },
  { id: "info", text: "Info", Icon: MdInfoOutline },
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
  <motion.div
    whileHover={{
      scale: 1.2,
      rotate: 15,
      color: "#87D4FE", // Change color on hover
    }}
    whileTap={{
      scale: 0.9,
      rotate: -5,
    }}
    transition={{
      duration: 0.3,
      type: "spring", // Use spring for a bouncy effect
      stiffness: 300, // Adjust the stiffness for bounce effect
      damping: 10,
    }}
    className="flex items-center justify-center"
    style={{ color }} // Apply the color prop here
  >
    <Icon />
  </motion.div>
);

export default function HomeNew() {
  //   const [currentTab, setCurrentTab] = useState("home");
  // const [tabHistory, setTabHistory] = useState(["home"]);
  const [screenHistory, setScreenHistory] = useState(["home"]);
  const [showLogo, setShowLogo] = useState(true);
  const [taskStatusData, setTaskStatusData] = useState(null);
  const { currentTab, setCurrentTab, userPoints, setUserPoints } = useTab();
  const { webApp, user, startParam } = useTelegram();
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referralProcessed, setReferralProcessed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });
  const userId = user ? user.id : "1051782980";
  const mainTabs = ["home", "referral", "leaderboard", "info"];
  console.log(
    "showReferralPopup",
    showReferralPopup,
    referralProcessed,
    startParam
  );

  const handleScreenChange = (newScreen) => {
    if (newScreen !== currentTab) {
      if (mainTabs.includes(newScreen)) {
        setScreenHistory([newScreen]);
      } else {
        setScreenHistory((prevHistory) => [...prevHistory, newScreen]);
      }
      setCurrentTab(newScreen);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 2000); // Set timeout for 2 seconds
    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);

  const handleBackButton = () => {
    if (screenHistory.length > 1) {
      const newHistory = screenHistory.slice(0, -1);
      setScreenHistory(newHistory);
      setCurrentTab(newHistory[newHistory.length - 1]);
    }
  };

  useEffect(() => {
    if (startParam && user && !referralProcessed) {
      setShowReferralPopup(true);
    } else if (!startParam) {
      setReferralProcessed(true);
    }
  }, [startParam, user, referralProcessed]);

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

  useEffect(() => {
    if (currentTab === "home" && referralProcessed) {
      const fetchTaskStatus = async () => {
        try {
          const response = await fetch(
            `https://miniapp-backend-4dd6ujjz7q-el.a.run.app/get_tasks?unique_id=${userId}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          setTaskStatusData(data);
        } catch (error) {
          console.error("Error fetching task status:", error);
          setTaskStatusData(null);
        }
      };

      fetchTaskStatus();
    }
  }, [currentTab, userId, referralProcessed]);

  useEffect(() => {
    if (referralProcessed) {
      const fetchUserPoints = async () => {
        try {
          const response = await fetch(
            `https://miniapp-backend-4dd6ujjz7q-el.a.run.app/get_points`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ unique_id: userId }),
            }
          );
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

      fetchUserPoints();
    }
  }, [userId, referralProcessed]);

  const ReferralPopup = ({ onConfirm, onReject }) => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-t border border-neutral-800 from-[#181818] to-black p-4 rounded-lg shadow-lg w-[300px]">
        <h2 className="text-lg font-bold mb-2 text-white">
          Join with Referral
        </h2>
        <p className="mb-3 text-[14px] text-gray-300">
          Do you want to join using this referral link?
        </p>
        <div className="flex justify-end space-x-1">
          <button
            onClick={onReject}
            className="px-3 py-1 cursor-pointer font- text-[13px] bg-[#2d2d2d] text-[#fff]  border border-neutral-800 rounded-[4px]"
          >
            Decline
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 cursor-pointer font- text-[13px] bg-[#426bff] text-[#fff]  border border-neutral-800 rounded-[4px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );

  const handleReferralConfirmation = async (confirmed) => {
    setShowReferralPopup(false);
    if (confirmed) {
      try {
        const response = await fetch(
          `https://miniapp-backend-4dd6ujjz7q-el.a.run.app/add_refferal?referrer_id=${startParam}&referee_id=${userId}`,
          { method: "GET" }
        );
        const data = await response.json();
        console.log("Referral added:", data);
        setShowConfetti(true);
        setNotification({
          show: true,
          type: "success",
          title: "Referral Successful",
          message: "You have successfully joined using a referral link!",
        });
        setTimeout(() => setShowConfetti(false), 3000);
      } catch (error) {
        console.error("Error adding referral:", error);
        setNotification({
          show: true,
          type: "error",
          title: "Referral Failed",
          message:
            "There was an error processing your referral. Please try again.",
        });
      }
    }
    setReferralProcessed(true);
  };

  const renderContent = () => {
    const props = {
      onScreenChange: handleScreenChange,
      userPoints: userPoints,
      taskStatusData: taskStatusData,
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
      case "coincard":
        return <CoinCard {...props} />;
      case "sitecard":
        return <SolanaAICard {...props} />;
      case "tokenomics":
        return <TokenomicsScreen {...props} />;
      case "saitoken":
        return <SaiTokenScreen {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {showLogo ? (
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
            style={{ height: "70px", width: "auto" }}
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
            key={currentTab} // This will trigger animation when tab changes
          >
            {renderContent()}
          </motion.div>
          <Tabbar className="bg-[#09090B] border border-neutral-800 sticky bottom-0 z-10 rounded-lg">
            {tabs.map(({ id, Icon }) => (
              <Tabbar.Item
                key={id}
                selected={id === currentTab}
                onClick={() => handleScreenChange(id)}
                className={`tabbar-item-no-bg font-semibold ${
                  id === currentTab ? "text-[#fff] text-[22px]" : "text-[18px]"
                }`}
              >
                <AnimatedIcon
                  Icon={Icon}
                  color={id === currentTab ? "#fff" : "#999"}
                />
              </Tabbar.Item>
            ))}
          </Tabbar>
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
