import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Modal, Placeholder, Skeleton, Spinner } from "@telegram-apps/telegram-ui";
import UserInfo from "../components/UserInfo";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { IoClose, IoDiamondOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import Notification from "./notification/Notification";
import Confetti from "react-confetti-boom";

const DailyTasks = () => {
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", title: "", message: "" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      name: "Follow Sharpe AI on Twitter",
      reward: 16500,
      icon: FaXTwitter,
      completed: false,
      modalButtonText: "Follow",
      link: "https://x.com/SharpeLabs",
    },
    {
      name: "Join the Sharpe AI Discord server",
      reward: 16500,
      icon: FaDiscord,
      completed: false,
      modalButtonText: "Join",
      link: "https://discord.com/invite/tFAvMTw6Hx",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonVisible(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCheckClick = (index) => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setTasks(prevTasks => prevTasks.map((task, i) => 
        i === index ? { ...task, completed: true } : task
      ));
      setNotification({
        show: true,
        type: "success",
        title: "Task Completed",
        message: "You have successfully completed the daily task!",
      });
      setShowConfetti(true);
      setIsModalOpen(false);
    }, 2000);
  };

  const handleButtonClick = (link) => {
    window.open(link, "_blank");
  };

  const renderTaskContent = (task) => {
    const Icon = task.icon;
    return (
      <motion.div
        className={`bg-gradient-to-r from-[#181818] to-black border rounded-md border-neutral-800 p-2 mb-2 flex justify-between items-center ${
          task.completed ? "opacity-70" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <div className="flex flex-row items-center gap-2">
          <motion.div
            className="bg-[#131313] border border-neutral-800 p-[6px] rounded-md"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon />
          </motion.div>
          <div>
            <motion.p
              className="font-medium text-[11px] pr-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {task.name}
            </motion.p>
          </div>
        </div>
        {task.completed ? (
          <motion.div
            className="mr-1"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <FaRegCheckCircle color="#22c55e" size={15} />
          </motion.div>
        ) : (
          <motion.span
            className="text-center flex items-center gap-1 bg-[#1d1d1d] rounded-full text-[12px] px-[8px] py-[4px]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            +{task.reward}
            <IoDiamondOutline size={10} />
          </motion.span>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <UserInfo /> */}
      <motion.div
        className="px-2 pb-2 mt-3"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <Skeleton className="rounded-md" visible={skeletonVisible}>
                {task.completed ? (
                  renderTaskContent(task)
                ) : (
                  <Modal
                    className="z-20 bg-gradient-to-r from-[#181818] to-black"
                    header={
                      <ModalHeader
                        className="pb-0"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        after={
                          <ModalClose>
                            <IoClose color="grey" style={{ color: "grey" }} />
                          </ModalClose>
                        }
                      />
                    }
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    trigger={
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderTaskContent(task)}
                      </motion.div>
                    }
                  >
                    <Placeholder className="px-4 pt-4">
                      <motion.div
                        className="bg-[#131313] border border-neutral-800 p-3 rounded-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <task.icon size={30} />
                      </motion.div>
                      <motion.div
                        className="flex flex-col justify-center items-center gap-1"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="font-semibold text-[16px] text-center">
                          {task.name}
                        </p>
                        <motion.span
                          className="text-center flex items-center gap-1 border bg-[#131313] border-neutral-800 rounded-full text-[12px] px-[8px] py-[4px]"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          +{task.reward}
                          <IoDiamondOutline size={10} />
                        </motion.span>
                      </motion.div>
                      <motion.div
                        className="flex flex-col w-full gap-1"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.div
                          className="flex-grow flex"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            className="flex-grow flex flex-row justify-center gap-1 items-center cursor-pointer text-[13px] px-2 font-normal bg-[#2d2d2d] text-[#fff] py-[8px] border border-neutral-800 rounded-[4px]"
                            onClick={() => handleButtonClick(task.link)}
                          >
                            {task.modalButtonText}
                          </Button>
                        </motion.div>
                        <motion.div
                          className="flex-grow flex"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={() => handleCheckClick(index)}
                            className="flex-grow flex flex-row justify-center gap-1 items-center cursor-pointer text-[13px] px-2 font-normal bg-[#191919] text-[#fff] py-[8px] border border-neutral-800 rounded-[4px]"
                            disabled={isChecking}
                          >
                            {isChecking ? (
                              <Spinner size="s" className="text-[#fff]" />
                            ) : (
                              "Check"
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </Placeholder>
                  </Modal>
                )}
              </Skeleton>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Notification
              show={notification.show}
              setShow={(show) => setNotification((prev) => ({ ...prev, show }))}
              type={notification.type}
              title={notification.title}
              message={notification.message}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti
              mode="boom"
              particleCount={410}
              shapeSize={20}
              launchSpeed={2}
              colors={["#98ecff", "#ff577f", "#ff884b", "#fff9b0"]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DailyTasks;