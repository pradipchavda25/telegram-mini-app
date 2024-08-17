import React from 'react';
import { Tabbar, TabbarLink } from 'konsta/react';
import { motion } from 'framer-motion';
import { IoHomeOutline } from 'react-icons/io5';
import { TbUsersPlus } from 'react-icons/tb';
import { MdOutlineLeaderboard, MdInfoOutline } from 'react-icons/md';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';

const tabs = [
  { id: "home", text: "Home", Icon: IoHomeOutline },
  { id: "referral", text: "Referral", Icon: TbUsersPlus },
  { id: "leaderboard", text: "Leaderboard", Icon: MdOutlineLeaderboard },
  { id: "info", text: "Info", Icon: MdInfoOutline },
  { id: "chat", text: "Chat", Icon: HiOutlineChatBubbleLeftRight },
];

const AnimatedIcon = ({ Icon, color }) => (
  <motion.div
    className="flex items-center justify-center"
    style={{ color }}
  >
    <Icon size={24} /> {/* Adjust size as needed */}
  </motion.div>
);

export default function KonstaTabbar({ currentTab, handleScreenChange }) {
  return (
    <Tabbar
      className="sticky bottom-0 z-10 rounded-t-lg pt-2 pb-3"
    >
      {tabs.map(({ id, text, Icon }) => (
        <TabbarLink
          key={id}
          active={id === currentTab}
          onClick={() => handleScreenChange(id)}
          className={`tabbar-item-no-bg font-semibold ${
            id === currentTab ? "text-[#fff]" : "text-[#999]"
          }`}
        //   label={text}
          icon={
            <AnimatedIcon
              Icon={Icon}
              color={id === currentTab ? "#fff" : "#999"}
            />
          }
        />
      ))}
    </Tabbar>
  );
}