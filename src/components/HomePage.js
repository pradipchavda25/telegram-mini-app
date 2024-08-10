import { Banner } from "@telegram-apps/telegram-ui";
import React from "react";
import UserInfo from "../components/UserInfo";
import { FiUserCheck } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import { TbCalendarClock } from "react-icons/tb";
import { useStateContext } from "../context/StateContext";
import { useTab } from "../context/TabContext";
import bannerBg from '../images/banner-bg.avif'
import { MdArrowForwardIos } from "react-icons/md";

const HomeScreen = () => {
  const { setCurrentTab } = useTab();

  return (
    <div className="">
    <UserInfo />
    <Banner
      background={
        <img
          alt="Nasa streams"
          src={bannerBg}
          style={{ width: "100%", filter: "blur(2px)" }}
        />
      }
      className="h-[100px] flex justify-center items-center text-center"
      type="section"
    >
      <div className="w-full">
        <p className="text-sm text-center text-neutral-400">Total Prize Pool</p>
        <p className="text-2xl text-center font-bold">10,000,000 $SAI</p>
      </div>
    </Banner>
    <div className="p-2">
      <div className="bg-[#0c0c0c] border border-neutral-700 rounded-md p-4 flex flex-row justify-between items-center">
        <div>
          <p className="font-medium text-[12px]">💎 to $SAI</p>
          <p className="text-[10px] text-neutral-400 pr-2">
            The more Diamonds you own, the more $SAI allocation you have.
          </p>
        </div>
        <button className="flex-grow flex flex-row justify-center gap-1 items-center cursor-pointer text-[13px] px-2 font-medium bg-[#98ECFF] text-black py-[8px]  rounded-[4px]" onClick={() => setCurrentTab('convert')}
        >
          Convert
          <MdArrowForwardIos size={10} color="black" />
        </button>
      </div>
    </div>
    <div className="px-2 pb-2">
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
          progress: "0/19 tasks done",
          reward: 16500,
          tab: "basictasks",
          icon: GoTasklist,
        },
        // {
        //   name: "OG Task",
        //   progress: "0/8 tasks done",
        //   reward: 44000,
        //   tab: "tab-7",
        //   icon: FiUserCheck,
        // },
        {
          name: "Daily Task",
          progress: "0/9 tasks done",
          reward: 6500,
          tab: "dailytasks",
          icon: TbCalendarClock,
        },
      ].map((task, index) => {
        const Icon = task.icon; // Dynamically get the icon component
        return (
          <div
            key={index} // Use index or a unique property if available
            onClick={() => setCurrentTab(task.tab)}
            className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center"
          >
            <div className="flex flex-row items-center gap-2">
              <div className="bg-[#131313] border border-neutral-800 p-2 rounded-md">
                <Icon /> {/* Render the icon component */}
              </div>
              <div>
                <p className="font-semibold text-[14px]">{task.name}</p>
                <p className="text-[12px] text-neutral-400">{task.progress}</p>
              </div>
            </div>
            <span className="border border-neutral-800 bg-neutral-950 rounded-full text-[12px] px-2 py-1">
              +{task.reward} 💎
            </span>
          </div>
        );
      })}
    </div>
  </div>
  );
};

export default HomeScreen;
