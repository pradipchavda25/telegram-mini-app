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

const tabs = [
  { id: "home", text: "Home", Icon: IoHomeOutline },
  { id: "referral", text: "Referral", Icon: TbUsersPlus },
  { id: "leaderboard", text: "Leaderboard", Icon: MdOutlineLeaderboard },
  { id: "info", text: "Info", Icon: MdInfoOutline },
];

export default function HomeNew() {
  //   const [currentTab, setCurrentTab] = useState("home");
  // const [tabHistory, setTabHistory] = useState(["home"]);
  const [screenHistory, setScreenHistory] = useState(["home"]);
  const { currentTab, setCurrentTab, userPoints, setUserPoints } = useTab();
  console.log("Current Tab:", userPoints);
  const { webApp, user } = useTelegram();
  const userId = user ? user.id  : "1051782980";

  const mainTabs = ["home", "referral", "leaderboard", "info"];

  const handleScreenChange = (newScreen) => {
    if (newScreen !== currentTab) {
      if (mainTabs.includes(newScreen)) {
        setScreenHistory([newScreen]);
      } else {
        setScreenHistory(prevHistory => [...prevHistory, newScreen]);
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
    if (webApp) {
      const showBackButton = screenHistory.length > 1 && !mainTabs.includes(currentTab);
      
      if (showBackButton) {
        webApp.BackButton.show();
        webApp.onEvent('backButtonClicked', handleBackButton);
      } else {
        webApp.BackButton.hide();
      }

      return () => {
        if (showBackButton) {
          webApp.offEvent('backButtonClicked', handleBackButton);
        }
        webApp.BackButton.hide();
      };
    }
  }, [webApp, screenHistory, currentTab]);

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`https://miniapp-backend-4dd6ujjz7q-el.a.run.app/get_points`,
        {
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

  useEffect(() => {
    fetchUserPoints();
  }, [userId]);

  const renderContent = () => {
    const props = { onScreenChange: handleScreenChange, userPoints: userPoints };

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
      <SectionHeader
        large
        className="bg-[#09090B] flex gap-2 items-center px-3 flex-row py-3 border-b border-neutral-800 sticky top-0 z-10"
      >
        <div className="flex gap-1">
          {/* <img src={sharpeLogo} alt="" /> */}
          <p className="font-normal">Sharpe</p>
        </div>
      </SectionHeader>
      <div className="flex-grow overflow-y-auto ">{renderContent()}</div>
      <Tabbar className="bg-[#09090B] sticky bottom-0 z-10">
        {tabs.map(({ id, text, Icon }) => (
          <Tabbar.Item
            key={id}
            text={text}
            selected={id === currentTab}
            onClick={() => handleScreenChange(id)}
            className="focus:text-[#98ECFF] font-normal text-[18px]"
          >
            <Icon />
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
}
