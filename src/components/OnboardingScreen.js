import {
  Button,
  Modal,
  Placeholder,
  Skeleton,
  Spinner,
} from "@telegram-apps/telegram-ui";
import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { IoClose } from "react-icons/io5";
import Notification from "./notification/Notification";
import useTelegram from "../context/TelegramContext";
import Confetti from "react-confetti-boom";
import { useTab } from "../context/TabContext";
import { AnimatePresence, motion } from "framer-motion";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import triggerHapticFeedback from "../utils/hapticUtils";
import { MdOutlineLogout } from "react-icons/md";

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

const TASK_TYPES = {
  SIGNUP: "signup",
};

  const INITIAL_TASKS = [
    {
      id: "signed_up",
      name: "Do Sign up and get points",
      reward: 500,
      icon: MdOutlineLogout,
      modalButtonText: "Sign up",
      verifier: TASK_TYPES.SIGNUP,
      taskId: "signed_up",
    },
  ];

const INITIAL_STATE = {
  tasks: INITIAL_TASKS,
  skeletonVisible: true,
  isChecking: false,
  notification: { show: false, type: "", title: "", message: "" },
  showConfetti: false,
  isModalOpen: false,
  showCheckButton: false,
  selectedTask: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "SET_SKELETON_VISIBLE":
      return { ...state, skeletonVisible: action.payload };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    case "SET_SHOW_CONFETTI":
      return { ...state, showConfetti: action.payload };
    case "SET_IS_MODAL_OPEN":
      return { ...state, isModalOpen: action.payload };
    case "SET_SHOW_CHECK_BUTTON":
      return { ...state, showCheckButton: action.payload };
    case "SET_SELECTED_TASK":
      return { ...state, selectedTask: action.payload };
    default:
      return state;
  }
}

const OnboardingScreen = ({ taskStatusData }) => {
  const { webApp, user } = useTelegram();
  const { setUserPoints, setCompletedTasks } = useTab();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  // const animation = useAnimation();

  const userId = useMemo(() => {
    return process.env.NODE_ENV === "production"
      ? user?.id
      : user?.id || "1051782980";
  }, [user]);

  const ApiBaseUrl = useMemo(() => {
    return process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PUBLIC_API_URL
      : process.env.REACT_APP_PUBLIC_LOCAL_API_URL;
  }, []);

  const sortedTasks = useMemo(() => {
    return [...state.tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }, [state.tasks]);

  const fetchTaskStatus = useCallback(
    async (userId) => {
      try {
        const response = await fetch(
          `${ApiBaseUrl}/get_tasks?unique_id=${userId}`,
          {
            method: "GET",
          }
        );
        return await response.json();
      } catch (error) {
        console.error("Error fetching task status:", error);
        return null;
      }
    },
    [ApiBaseUrl]
  );

  useEffect(() => {
    const updateTasksStatus = async () => {
      dispatch({ type: "SET_SKELETON_VISIBLE", payload: true });

      dispatch({
        type: "SET_TASKS",
        payload: INITIAL_TASKS.map((task) => ({
          ...task,
          completed: task.taskId in taskStatusData ? taskStatusData[task.taskId] : false,
        })),
      });

      dispatch({ type: "SET_SKELETON_VISIBLE", payload: false });
    };

    updateTasksStatus();
  }, [userId, taskStatusData]);

  const verifyTask = useCallback(
    async (taskType, userId, taskId) => {
      try {
        const url = `${ApiBaseUrl}/verify_tasks`;
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ unique_id: userId, task_id: taskId }),
        };

        const response = await fetch(url, options);
        const data = await response.json();

        return {
          success: data.status === "success",
          message: "Task Completed Successfully",
          taskId: taskId,
        };
      } catch (error) {
        console.error(`Error verifying ${taskType}:`, error);
        return {
          success: false,
          message: `Error verifying ${taskType}. Please try again.`,
          taskId: taskId,
        };
      }
    },
    [ApiBaseUrl]
  );

  const handleCheckClick = async () => {
    if (!state.selectedTask) return;
    dispatch({ type: "SET_IS_CHECKING", payload: true });
    triggerHapticFeedback("impact");

    try {
      const { success, message, taskId } = await verifyTask(
        state.selectedTask.verifier,
        userId,
        state.selectedTask.taskId
      );
      if (success) {
        dispatch({
          type: "SET_TASKS",
          payload: state.tasks.map((task) =>
            task.id === state.selectedTask.id
              ? { ...task, completed: true }
              : task
          ),
        });
        setCompletedTasks((prev) => ({
          ...prev,
          basictasks: prev.basictasks + 1,
        }));

        dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            show: true,
            type: "success",
            title: "Success",
            message:
              message ||
              `Task "${state.selectedTask.name}" completed successfully!`,
          },
        });
        dispatch({ type: "SET_SHOW_CONFETTI", payload: true });
        triggerHapticFeedback("success");

        setTimeout(() => {
          dispatch({ type: "SET_IS_MODAL_OPEN", payload: false });
          dispatch({ type: "SET_SHOW_CHECK_BUTTON", payload: false });
          dispatch({ type: "SET_SELECTED_TASK", payload: null });
        }, 1500);
      } else {
        dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            show: true,
            type: "warning",
            title: "Task Not Completed",
            message:
              message ||
              `Unable to verify task: ${state.selectedTask.name}. Please try again.`,
          },
        });
        triggerHapticFeedback("error");
      }
    } catch (error) {
      console.error(`Error verifying task: ${state.selectedTask.name}`, error);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          show: true,
          type: "error",
          title: "Error",
          message: `An error occurred while verifying the task. Please try again later.`,
        },
      });
      triggerHapticFeedback("error");
    }
    dispatch({ type: "SET_IS_CHECKING", payload: false });
  };

  const handleButtonClick = (link) => {
    if (webApp && webApp.openLink) {
      webApp.openLink(link);
    } else {
      window.open(link, "_blank");
    }
    dispatch({ type: "SET_SHOW_CHECK_BUTTON", payload: true });
  };

  const handleOpenModal = (task) => {
    dispatch({ type: "SET_SELECTED_TASK", payload: task });
    dispatch({ type: "SET_IS_MODAL_OPEN", payload: true });
    dispatch({ type: "SET_SHOW_CHECK_BUTTON", payload: false });
    triggerHapticFeedback("impact");
  };

  useEffect(() => {
    if (state.showConfetti) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_SHOW_CONFETTI", payload: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.showConfetti]);

  useEffect(() => {
    if (state.skeletonVisible) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_SKELETON_VISIBLE", payload: false });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.skeletonVisible]);

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
              className="font-normal text-white text-[14px] pr-4"
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
              <Skeleton className="rounded-md" visible={state.skeletonVisible}>
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
                    open={
                      state.isModalOpen && state.selectedTask?.id === task.id
                    }
                    onOpenChange={(open) => {
                      dispatch({ type: "SET_IS_MODAL_OPEN", payload: open });
                      if (!open)
                        dispatch({ type: "SET_SELECTED_TASK", payload: null });
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
                    {state.selectedTask && (
                      <Placeholder className="px-4 pt-4">
                        <motion.div
                          className="bg-[#131313] border border-neutral-800 p-3 rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                        >
                          <state.selectedTask.icon size={30} color={"white"} />
                        </motion.div>
                        <motion.div
                          className="flex flex-col justify-center items-center gap-1"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="font-semibold text-[16px] text-white text-center">
                            {state.selectedTask.name}
                          </p>
                          <motion.span
                            className="text-center flex items-center text-white border bg-[#131313] border-neutral-800 rounded-full text-[14px] px-[8px] py-[4px]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            +{state.selectedTask.reward}
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
                          {!state.showCheckButton && !TASK_TYPES.SIGNUP ? (
                            <motion.div
                              className="flex-grow flex"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                className="flex-grow flex flex-row justify-center gap-1 items-center cursor-pointer text-[13px] px-2 font-normal bg-[#2d2d2d] text-[#fff] py-[8px] border border-neutral-800 rounded-[4px]"
                                onClick={() =>
                                  handleButtonClick(state.selectedTask.link)
                                }
                              >
                                {state.selectedTask.modalButtonText}
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
                                disabled={state.isChecking}
                              >
                                {state.isChecking ? (
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
        {state.notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Notification
              show={state.notification.show}
              setShow={(show) =>
                dispatch({
                  type: "SET_NOTIFICATION",
                  payload: { ...state.notification, show },
                })
              }
              type={state.notification.type}
              title={state.notification.title}
              message={state.notification.message}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {state.showConfetti && (
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

export default OnboardingScreen;
