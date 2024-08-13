import React from "react";
import { motion } from "framer-motion";
import { IoArrowDown, IoDiamondOutline } from "react-icons/io5";
import sharpeLogo from "../images/sharpe-white-logo.svg";

const ConvertScreen = ({ userPoints }) => {
  const stats = [
    { name: "Snapshot diamonds", value: `${userPoints}` },
    { name: "Converted diamonds", value: "0" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0f0e0e] to-black text-white min-h-screen p-4">
      {/* Header */}
      <motion.h1
        className="text-xl font-bold text-center mb-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Convert to $SAI
      </motion.h1>
      <motion.p
        className="text-neutral-400 text-[12px] text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        the more diamonds own,
      </motion.p>
      <motion.p
        className="text-neutral-400 text-[12px] mb-3 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        the more $SAI you will have.
      </motion.p>

      <motion.div
        className="bg-[#0c0c0c] border rounded-[8px] border-neutral-950"
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
                <p className="text-[12px] text-center text-neutral-300 font-medium">
                  {stat.name}
                </p>
                <p className="mt-1 flex justify-center gap-x-2">
                  <span className="text-[16px] flex items-center gap-1 font-semibold tracking-tight text-center text-white">
                    {stat.value}
                    <IoDiamondOutline size={12} />
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Airdrop Snapshot */}
      <motion.div
        className="bg-gradient-to-b from-[#181818] to-black border rounded-md border-neutral-800 p-4 mt-4 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <h2 className="text-[18px] text-center font-semibold mb-1">
          Airdrop Snapshot Phase One
        </h2>
        <p className="text-[12px] text-center text-neutral-400">
          The conversion period will end in the next
        </p>
        <p className="text-[12px] text-center font-bold text-neutral-400 mb-2">
          00 Hours
        </p>
        <div className="bg-gradient-to-b from-[#181818] to-black border border-neutral-800 rounded p-2 text-center">
          <p className="text-green-500 text-2xl font-semibold">00:00:00</p>
        </div>
      </motion.div>

      {/* Conversion Info */}
      <motion.p
        className="text-[12px] px-6 text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        You need at least{" "}
        <span className="text-green-400 font-bold">20,000</span> diamonds to
        convert them into <span className="text-green-400 font-bold">$SAI</span>
      </motion.p>

      {/* Conversion Options */}
      <motion.div
        className="grid grid-cols-2 gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        {[
          { diamonds: 1000, time: 1 },
          { diamonds: 2000, time: 2 },
          { diamonds: 5000, time: 7 },
          { diamonds: 10000, time: 17 },
          { diamonds: 20000, time: 41 },
          { diamonds: 50000, time: 124 },
        ].map((option, index) => (
          <motion.button
            disabled
            key={index}
            className="bg-gradient-to-b from-[#181818] to-black cursor-pointer disabled:text-neutral-600 border rounded-md border-neutral-800 p-3 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="font-bold flex items-center gap-1 justify-center text-[14px] text-center">
              <IoDiamondOutline size={12} /> {option.diamonds.toLocaleString()}
            </p>
            {option.time && (
              <>
                <div className="flex justify-center py-1">
                  <IoArrowDown color="grey" size={12} />
                </div>
                <p className="flex justify-center gap-1 text-[16px] font-bold items-center">
                  <img
                    src={sharpeLogo}
                    alt=""
                    style={{ height: "16px", width: "16px" }}
                  />{" "}
                  {option.time}
                </p>
              </>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Convert Button */}
      <motion.button
        disabled
        className="w-full text-[16px] cursor-pointer px-2 font-normal bg-[#131313] text-[#fff] disabled:text-white disabled:opacity-65 py-2 rounded-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Convert
      </motion.button>
    </div>
  );
};

export default ConvertScreen;
