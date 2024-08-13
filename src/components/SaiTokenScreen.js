import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoEarthSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import appBanner from '../images/sai-token-banner.png';

const SaiTokenScreen = () => {
  const socialLinks = [
    { icon: <FaXTwitter />, text: "X (Twitter)", link: "https://twitter.com/SharpeLabs" },
    { icon: <IoEarthSharp />, text: "Website", link: "https://sharpe.ai/" },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white h-[100%] flex items-start justify-center">
      <motion.div
        className="max-w-md w-full bg-[#0A0A0A] rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="p-4">
          <motion.h2
            className="text-xl font-bold mb-4 text-center text-[#c5c5c5]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            #SAI
          </motion.h2>

          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.img
              src={appBanner}
              alt=""
              style={{ borderRadius: '6px' }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>

          <motion.p
            className="text-center text-[14px] font-semibold text-neutral-50 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Official token of Sharpe AI
          </motion.p>
          <motion.p
            className="text-center text-[12px] px-4 text-neutral-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            $SAI is the native utility token of Sharpe AI, incentivizing participation, funding development, and enabling governance in the ecosystem.
          </motion.p>

          <div className="flex justify-center gap-1">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.link}
                target="_blank"
                className={`flex w-max items-center justify-center`} rel="noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: "#1d1d1d" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-flex w-max justify-center items-center text-nowrap rounded-md bg-[#0C0C0C] px-2 py-1 text-[13px] gap-1 font-normal text-neutral-400 ring-1 ring-inset ring-neutral-400/20">
                  {link.icon} {link.text}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SaiTokenScreen;
