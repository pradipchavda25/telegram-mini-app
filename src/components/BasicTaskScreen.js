import {
  Button,
  Modal,
  Placeholder,
  Skeleton,
  Spinner,
} from "@telegram-apps/telegram-ui";
import React, { useCallback, useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import { FaTelegramPlane, FaDiscord, FaRegCheckCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { IoClose, IoDiamondOutline } from "react-icons/io5";
import Notification from "./notification/Notification";
import useTelegram from "../context/TelegramContext";
import Confetti from "react-confetti-boom";
// import Confetti from 'react-confetti'
import useWindowSize from "react-use/lib/useWindowSize";
import { useTab } from "../context/TabContext";
import { AnimatePresence, motion } from "framer-motion";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import triggerHapticFeedback from "../utils/hapticUtils";

const TASK_TYPES = {
  TELEGRAM: "telegramJoin",
  TWITTER: "twitterFollow",
  DISCORD: "discordJoin",
};

const taskVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
};

const BasicTaskScreen = ({ taskStatusData }) => {
  const { webApp, user } = useTelegram();
  const userId = user.id  
  const ApiBaseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PUBLIC_API_URL
      : process.env.REACT_APP_PUBLIC_LOCAL_API_URL;

  const INITIAL_TASKS = [
    {
      id: "twitter_sharpe_ai",
      name: "Follow Sharpe AI on X",
      reward: 500,
      icon: FaXTwitter,
      modalButtonText: "Follow",
      link: "https://twitter.com/SharpeLabs",
      verifier: TASK_TYPES.TWITTER,
      taskId: "followed_SharpeLabs",
    },
    {
      id: "twitter_sharpe_signals",
      name: "Follow Sharpe Signals on X",
      reward: 500,
      icon: FaXTwitter,
      modalButtonText: "Follow",
      link: "https://twitter.com/SharpeSignals",
      verifier: TASK_TYPES.TWITTER,
      taskId: "followed_SharpeSignals",
    },
    {
      id: "twitter_brownian",
      name: "Follow Brownian on X",
      reward: 500,
      icon: FaXTwitter,
      modalButtonText: "Follow",
      link: "https://x.com/Brownianxyz",
      verifier: TASK_TYPES.TWITTER,
      taskId: "followed_Brownianxyz",
    },
    {
      id: "twitter_Hive_intelligence",
      name: "Follow Hive Intelligence on X",
      reward: 500,
      icon: FaXTwitter,
      modalButtonText: "Follow",
      link: "https://x.com/Hive_Intel",
      verifier: TASK_TYPES.TWITTER,
      taskId: "followed_HiveIntellegence",
    },
    {
      id: "twitter_firefly",
      name: "Follow Firefly on X",
      reward: 500,
      icon: FaXTwitter,
      modalButtonText: "Follow",
      link: "https://x.com/JoinFirefly",
      verifier: TASK_TYPES.TWITTER,
      taskId: "followed_JoinFirefly",
    },
    {
      id: "twitter_Sharpe_intern",
      name: "Follow Sharpe Intern on X",
      reward: 500,
      icon: FaXTwitter,
      modalButtonText: "Follow",
      link: "https://x.com/SharpeIntern",
      verifier: TASK_TYPES.TWITTER,
      taskId: "followed_SharpeIntern",
    },
    {
      id: "discord_task",
      name: "Join the Sharpe AI Discord server",
      reward: 500,
      icon: FaDiscord,
      modalButtonText: "Join",
      link: `${ApiBaseUrl}/join_discord?unique_id=${userId}`,
      verifier: TASK_TYPES.DISCORD,
      taskId: "joined_discord",
    },
    {
      id: "telegram_task",
      name: "Join the Sharpe AI Telegram group",
      reward: 500,
      icon: FaTelegramPlane,
      modalButtonText: "Join",
      link: "https://t.me/SharpeAI_Official",
      verifier: TASK_TYPES.TELEGRAM,
      taskId: "followed_telegram",
    },
  ];
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { setUserPoints, setCompletedTasks } = useTab();

  const fetchTaskStatus = async (userId) => {
    try {
      const response = await fetch(
        `${ApiBaseUrl}/get_tasks?unique_id=${userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching task status:", error);
      return null;
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`${ApiBaseUrl}/get_points`, {
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
    const updateTasksStatus = async () => {
      setSkeletonVisible(true);

      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          completed:
            task.taskId in taskStatusData ? taskStatusData[task.taskId] : false,
        }))
      );

      setSkeletonVisible(false);
    };

    updateTasksStatus();
  }, [userId]);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const verifyTask = async (taskType, userId, taskId) => {
    try {
      let url = "";
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      switch (taskType) {
        case TASK_TYPES.TELEGRAM:
          url = `${ApiBaseUrl}/verify_telegram`;
          options.body = JSON.stringify({ user_id: userId, unique_id: userId });
          break;
        case TASK_TYPES.DISCORD:
          url = `${ApiBaseUrl}/join_discord?unique_id=${userId}`;
          options.method = "GET";
          delete options.headers; // Remove headers for GET request
          break;
        case TASK_TYPES.TWITTER:
          url = `${ApiBaseUrl}/verify_tasks`;
          options.body = JSON.stringify({ unique_id: userId, task_id: taskId });
          break;
        default:
          throw new Error("Invalid task type");
      }

      const response = await fetch(url, options);
      const data = await response.json();

      if (taskType === TASK_TYPES.TWITTER) {
        return {
          success: data.status === "success",
          message: data.message || "Task Completed Successfully.",
          taskId: taskId,
        };
      } else if (taskType === TASK_TYPES.TELEGRAM) {
        return {
          success: data.is_member,
          message: data.is_member
            ? "Task Completed Successfully."
            : "Failed to verify. Please try again.",
        };
      } else if (taskType === TASK_TYPES.DISCORD) {
        return {
          success: data.joined,
          message: data.joined
            ? "Task Completed Successfully."
            : "Error joining discord server. Please try again!",
        };
      }
    } catch (error) {
      console.error(`Error verifying ${taskType}:`, error);
      return {
        success: false,
        message: `Error verifying ${taskType}. Please try again.`,
      };
    }
  };

  const handleCheckClick = async () => {
    if (!selectedTask) return;
    setIsChecking(true);
    triggerHapticFeedback("impact");

    try {
      if (selectedTask.verifier === TASK_TYPES.DISCORD) {
        // Use fetchTaskStatus to get the latest task status
        const taskStatus = await fetchTaskStatus(userId);

        if (taskStatus && taskStatus.joined_discord) {
          // Discord task completed successfully
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === selectedTask.id ? { ...task, completed: true } : task
            )
          );
          setCompletedTasks((prev) => ({
            ...prev,
            basictasks: prev.basictasks + 1,
          }));

          await fetchUserPoints();

          setNotification({
            show: true,
            type: "success",
            title: "Success",
            message: "Discord server joined successfully!",
          });
          setShowConfetti(true);
          triggerHapticFeedback("success");

          setTimeout(() => {
            setIsModalOpen(false);
            setShowCheckButton(false);
            setSelectedTask(null);
          }, 1500);
        } else {
          // Discord task not completed
          setNotification({
            show: true,
            type: "warning",
            title: "Task Not Completed",
            message: "Discord server not joined!",
          });
          triggerHapticFeedback("error");
        }
      } else {
        // For other task types, keep the existing verification logic
        const { success, message, taskId } = await verifyTask(
          selectedTask.verifier,
          userId,
          selectedTask.taskId
        );
        if (success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === selectedTask.id ? { ...task, completed: true } : task
            )
          );
          setCompletedTasks((prev) => ({
            ...prev,
            basictasks: prev.basictasks + 1,
          }));

          await fetchUserPoints();

          setNotification({
            show: true,
            type: "success",
            title: "Success",
            message:
              message || `Task "${selectedTask.name}" completed successfully!`,
          });
          setShowConfetti(true);
          triggerHapticFeedback("success");

          setTimeout(() => {
            setIsModalOpen(false);
            setShowCheckButton(false);
            setSelectedTask(null);
          }, 1500);
        } else {
          setNotification({
            show: true,
            type: "warning",
            title: "Task Not Completed",
            message:
              message ||
              `Unable to verify task: ${selectedTask.name}. Please try again.`,
          });
          triggerHapticFeedback("error");
        }
      }
    } catch (error) {
      console.error(`Error verifying task: ${selectedTask.name}`, error);
      setNotification({
        show: true,
        type: "error",
        title: "Error",
        message: `An error occurred while verifying the task. Please try again later.`,
      });
      triggerHapticFeedback("error");
    }
    setIsChecking(false);
  };

  const handleButtonClick = (link) => {
    if (webApp && webApp.openLink) {
      webApp.openLink(link);
    } else {
      window.open(link, "_blank");
    }
    setShowCheckButton(true);
  };

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setShowCheckButton(false);
    triggerHapticFeedback("impact");
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (skeletonVisible) {
      const timer = setTimeout(() => {
        setSkeletonVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [skeletonVisible]);

  const renderTaskContent = (task, index) => {
    const Icon = task.icon;
    return (
      <motion.div
        className={`bg-gradient-to-r from-[#181818] to-black border rounded-md border-neutral-800 p-2 mb-2 flex justify-between items-center ${
          task.completed ? "opacity-70" : ""
        }`}
        variants={taskVariants}
        custom={index}
        whileHover={{
          scale: 1,
          boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.2)",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex flex-row items-center gap-2">
          <motion.div
            className="bg-[#131313] border border-neutral-800 p-[6px] rounded-md"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              <Icon color={"white"} />
            </motion.div>
          </motion.div>
          <div>
            <motion.p
              className="font-medium text-white text-[14px] pr-4"
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
            <FaRegCheckCircle color="#22c55e" size={16} />
          </motion.div>
        ) : (
          <motion.span
            className="text-center flex items-center text-white bg-[#1d1d1d] rounded-full text-[14px] px-[8px] py-[4px]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            +{task.reward}
            {/* <IoDiamondOutline size={10} /> */}
            <img
              src={sharpeLogo}
              alt=""
              style={{ height: "22px", width: "22px" }}
            />
          </motion.span>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      className="bg-neutral-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* <UserInfo /> */}
      <motion.div
        className="px-2 pb-2 mt-3"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {sortedTasks.map((task, index) => (
            <motion.div
              key={task.id}
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -50 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1,
                duration: 0.8,
              }}
            >
              <Skeleton className="rounded-md" visible={skeletonVisible}>
                {task.completed ? (
                  renderTaskContent(task, index)
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
                    open={isModalOpen && selectedTask?.id === task.id}
                    onOpenChange={(open) => {
                      setIsModalOpen(open);
                      if (!open) setSelectedTask(null);
                    }}
                    trigger={
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleOpenModal(task)}
                      >
                        {renderTaskContent(task, index)}
                      </motion.div>
                    }
                  >
                    {selectedTask && (
                      <Placeholder className="px-4 pt-4">
                        <motion.div
                          className="bg-[#131313] border border-neutral-800 p-3 rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                        >
                          <selectedTask.icon size={30} color={"white"} />
                        </motion.div>
                        <motion.div
                          className="flex flex-col justify-center items-center gap-1"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="font-semibold text-[16px] text-white text-center">
                            {selectedTask.name}
                          </p>
                          <motion.span
                            className="text-center flex items-center text-white border bg-[#131313] border-neutral-800 rounded-full text-[14px] px-[8px] py-[4px]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            +{selectedTask.reward}
                            {/* <IoDiamondOutline size={10} /> */}
                            <img
                              src={sharpeLogo}
                              alt=""
                              style={{ height: "22px", width: "22px" }}
                            />
                          </motion.span>
                        </motion.div>
                        <motion.div
                          className="flex flex-col w-full gap-1"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {!showCheckButton ? (
                            <motion.div
                              className="flex-grow flex"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                className="flex-grow flex flex-row justify-center gap-1 items-center cursor-pointer text-[13px] px-2 font-normal bg-[#2d2d2d] text-[#fff] py-[8px] border border-neutral-800 rounded-[4px]"
                                onClick={() =>
                                  handleButtonClick(selectedTask.link)
                                }
                              >
                                {selectedTask.modalButtonText}
                              </Button>
                            </motion.div>
                          ) : (
                            <motion.div
                              className="flex-grow flex"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={handleCheckClick}
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
                          )}
                        </motion.div>
                      </Placeholder>
                    )}
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
              particleCount={400}
              shapeSize={22}
              launchSpeed={2}
              colors={["#98ecff", "#ff577f", "#ff884b", "#fff9b0"]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BasicTaskScreen;
