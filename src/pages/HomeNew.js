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
  const [tabHistory, setTabHistory] = useState(["home"]);
  const { currentTab, setCurrentTab } = useTab();
  console.log("Current Tab:", currentTab);
  const { webApp } = useTelegram();
  
  const handleTabChange = (newTab) => {
    if (newTab !== currentTab) {
      setTabHistory(prevHistory => [...prevHistory, newTab]);
      setCurrentTab(newTab);
    }
  };

  const handleBackButton = () => {
    if (tabHistory.length > 1) {
      const newHistory = tabHistory.slice(0, -1);
      setTabHistory(newHistory);
      setCurrentTab(newHistory[newHistory.length - 1]);
    }
  };

  useEffect(() => {
    if (webApp) {
      if (tabHistory.length > 1) {
        webApp.BackButton.show();
        webApp.onEvent('backButtonClicked', handleBackButton);
      } else {
        webApp.BackButton.hide();
      }

      return () => {
        webApp.offEvent('backButtonClicked', handleBackButton);
        webApp.BackButton.hide();
      };
    }
  }, [webApp, tabHistory]);

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <HomeScreen />;
      case "referral":
        return <ReferralScreen />;
      case "onboarding":
        return <OnboardingScreen />;
      case "basictasks":
        return <BasicTaskScreen />;
      case "dailytasks":
        return <DailyTasks />;
      case "convert":
        return <ConvertScreen />;
      case "leaderboard":
        return <LeaderboardScreen />;
      case "info":
        return <CompanyInfoScreen />;
      case "coincard":
        return <CoinCard />;
      case "sitecard":
        return <SolanaAICard />;
        case "tokenomics":
        return <TokenomicsScreen />;
        case "saitoken":
          return <SaiTokenScreen />;
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
          <img src={sharpeLogo} alt="" />
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
            onClick={() => handleTabChange(id)}
            className="focus:text-[#98ECFF] font-normal text-[18px]"
          >
            <Icon />
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
}
