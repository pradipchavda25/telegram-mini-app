import React from "react";
import { motion } from "framer-motion";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import { MdArrowForwardIos } from "react-icons/md";
import { useTab } from "../context/TabContext";

const CompanyInfoScreen = ({ onScreenChange }) => {
  const { setCurrentTab } = useTab();

  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
    setCurrentTab(tabName);
  };

  const ecosystemItems = [
    {
      name: "$SAI",
      description: "Official token of Sharpe AI",
      tag: "Token",
      tab: 'saitoken'
    },
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
      className="bg-neutral-950 text-white min-h-screen p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="text-center mb-6" variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-1">Brownian</h1>
        <p className="text-neutral-400 text-[16px]">Full-Stack AI LLM for Crypto</p>
      </motion.div>

      {/* Menu Items */}
      <motion.div className="space-y-2 mb-4" variants={itemVariants}>
        {[
          {
            name: "Overview",
            description: "Get to know about sharpe AI",
            tab: 'sitecard'
          },
          // {
          //   name: "Tokenomics",
          //   description: "Discover $SAI Tokenomics & token use case",
          //   tab: 'tokenomics'
          // },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-2 flex justify-between items-center"
            onClick={() => navigateToAnotherScreen(item.tab)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-row items-center gap-2">
              <motion.div
                className="bg-[#131313] border border-neutral-800 p-2 rounded-md"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={sharpeLogo}
                  alt=""
                  style={{ height: "20px", width: "20px" }}
                />
              </motion.div>
              <div>
                <p className="font-semibold text-[14px]">{item.name}</p>
                <p className="text-[12px] text-neutral-400">
                  {item.description}
                </p>
              </div>
            </div>
            <MdArrowForwardIos
              color="grey"
              size={12}
              style={{ marginRight: "8px" }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Ecosystem */}
      <motion.h3
        className="text-neutral-400 text-[14px] tracking-wide font-semibold mb-2"
        variants={itemVariants}
      >
        ECOSYSTEM
      </motion.h3>
      <motion.div className="space-y-2" variants={itemVariants}>
        {ecosystemItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#0c0c0c] cursor-pointer border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center"
            onClick={() => navigateToAnotherScreen(item.tab)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-row items-center gap-2">
              <motion.div
                className="bg-[#131313] border border-neutral-800 p-2 rounded-md"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={sharpeLogo}
                  alt=""
                  style={{ height: "20px", width: "20px" }}
                />
              </motion.div>
              <div>
                <p className="font-semibold text-[14px] mb-1 flex items-center gap-1">
                  {item.name}
                  <span className="border border-neutral-800 bg-[#131313] rounded-full text-[8px] px-2 py-1">
                    {item.tag}
                  </span>
                </p>
                <p className="text-[10px] text-neutral-400 pr-8">
                  {item.description}
                </p>
              </div>
            </div>
            <MdArrowForwardIos
              color="grey"
              size={12}
              style={{ marginRight: "8px" }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CompanyInfoScreen;
