import React, { useState } from "react";
import {
  Page,
  Navbar, Tabbar,
  TabbarLink, Icon
} from "konsta/react";

import { MdInfo, MdSend, MdLeaderboard } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

import HomeScreen from "../components/HomePage";
import ConvertScreen from "../components/ConvertScreen";
import BasicTaskScreen from "../components/BasicTaskScreen";
import { useStateContext } from "../context/StateContext";
import LeaderboardScreen from "../components/LeaderboardScreen";
import ReferralScreen from "../components/ReferralScreen";
import CompanyInfoScreen from "../components/CompanyInfoScreen";
import OnboardingScreen from "../components/OnboardingScreen";
export default function TabbarPage() {
  const { activeTab, setActiveTab } = useStateContext();
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const [isTabbarIcons, setIsTabbarIcons] = useState(true);
  return (
    <Page>
      {" "}
      <Navbar
        title="Sharpe AI"
        backLink="Back"
        bgClassName="#000"
        style={{backgroundColor: '#0a0a0a'}}
        />
      <Tabbar
        labels={isTabbarLabels}
        icons={isTabbarIcons}
        className="left-0 bottom-0 fixed bg-black"
      >
        {" "}
        <TabbarLink
          active={activeTab === "tab-1" || activeTab === "tab-6" || activeTab === "tab-9" || activeTab === "tab-5"}
          onClick={() => setActiveTab("tab-1")}
          icon={
            isTabbarIcons && (
              <Icon material={<IoMdHome className="w-6 h-6" />} />
            )
          }
          label={isTabbarLabels && "Home"}
        />{" "}
        <TabbarLink
          active={activeTab === "tab-2"}
          onClick={() => setActiveTab("tab-2")}
          icon={
            isTabbarIcons && (
              <Icon material={<MdLeaderboard className="w-6 h-6" />} />
            )
          }
          label={isTabbarLabels && "Leaderboard"}
        />{" "}
        <TabbarLink
          active={activeTab === "tab-3"}
          onClick={() => setActiveTab("tab-3")}
          icon={
            isTabbarIcons && <Icon material={<MdSend className="w-6 h-6" />} />
          }
          label={isTabbarLabels && "Referral"}
        />{" "}
        <TabbarLink
          active={activeTab === "tab-4"}
          onClick={() => setActiveTab("tab-4")}
          icon={
            isTabbarIcons && <Icon material={<MdInfo className="w-6 h-6" />} />
          }
          label={isTabbarLabels && "Info"}
        />{" "}
      </Tabbar>
      {activeTab === "tab-1" && <HomeScreen />}{" "}
      {activeTab === "tab-2" && <LeaderboardScreen />}{" "}
      {activeTab === "tab-3" && <ReferralScreen />}{" "}
      {activeTab === "tab-4" && <CompanyInfoScreen />}{" "}
      {activeTab === "tab-5" && <OnboardingScreen />}{" "}
      {activeTab === "tab-9" && <ConvertScreen />}{" "}
      {activeTab === "tab-6" && <BasicTaskScreen />}{" "}
    </Page>
  );
}
