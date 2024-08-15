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
import { motion } from "framer-motion";
import UserInfo from "../components/UserInfo";

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
  const { webApp, user } = useTelegram();
  const userId = user ? user.id : "1051782980";

  const mainTabs = ["home", "referral", "leaderboard", "info"];

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

  useEffect(() => {
    if (currentTab === "home") {
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
  }, [currentTab, userId]);
  

  const handleBackButton = () => {
    if (screenHistory.length > 1) {
      const newHistory = screenHistory.slice(0, -1);
      setScreenHistory(newHistory);
      setCurrentTab(newHistory[newHistory.length - 1]);
    }
  };

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

  useEffect(() => {
    fetchUserPoints();
  }, [userId]);

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
    </div>
  );
}
