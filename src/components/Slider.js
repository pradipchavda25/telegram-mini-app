import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiCheckSquare } from "react-icons/fi";
import { useTab } from "../context/TabContext";
import { useSwipeable } from "react-swipeable";
import { MdOutlineLeaderboard } from "react-icons/md";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCurrentTab } = useTab();

  const slides = [
    {
      title: "Invite your BROs",
      subtitle: "Sharpe AI community",
      buttonText: "Invite",
      action: () => setCurrentTab("referral"),
      icon: FiUsers,
    },
    {
      title: "Complete Basic Tasks",
      subtitle: "Earn more BROs",
      buttonText: "View",
      action: () => setCurrentTab("basictasks"),
      icon: FiCheckSquare,
    },
    {
      title: "Learn more about Brownian",
      subtitle: "OG leaderboard",
      buttonText: "Check",
      action: () => setCurrentTab("info"),
      icon: MdOutlineLeaderboard,
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 4000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <motion.div
      {...handlers}
      className="relative w-full h-20 bg-gradient-to-b from-[#181818] to-black border border-neutral-800 rounded-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center h-full px-3"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white"
            >
              {React.createElement(slides[currentIndex].icon, { size: 18 })}
            </motion.div>
            <div className="flex flex-col">
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-[16px] font-semibold"
              >
                {slides[currentIndex].title}
              </motion.h3>
              {/* <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-neutral-400 text-[13px]"
              >
                {slides[currentIndex].subtitle}
              </motion.p> */}
            </div>
          </div>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={slides[currentIndex].action}
            className="text-[14px] py-1 px-2 hover:bg-[#2d2d2d] transition-colors font-normal bg-[#131313] text-[#fff] border border-neutral-800 rounded-full flex items-center space-x-1"
          >
            <span>{slides[currentIndex].buttonText}</span>
            {/* <FiChevronRight size={12} /> */}
          </motion.button>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-1  rounded-full ${
              currentIndex === index ? "bg-white" : "bg-neutral-600"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            animate={currentIndex === index ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Slider;