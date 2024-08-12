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
import { IoClose } from "react-icons/io5";
import Notification from "./notification/Notification";
import useTelegram from "../context/TelegramContext";
import Confetti from "react-confetti-boom";
// import Confetti from 'react-confetti'
import useWindowSize from "react-use/lib/useWindowSize";

const TASK_TYPES = {
  TELEGRAM: 'telegramJoin',
  TWITTER: 'twitterFollow',
  DISCORD: 'discordJoin',
};

const INITIAL_TASKS = [
  {
    name: "Follow Sharpe AI on Twitter",
    reward: 500,
    icon: FaXTwitter,
    modalButtonText: "Follow",
    link: "https://x.com/SharpeLabs",
    verifier: TASK_TYPES.TWITTER,
  },
  {
    name: "Join the Sharpe AI Discord server",
    reward: 500,
    icon: FaDiscord,
    modalButtonText: "Join",
    link: "https://discord.com/invite/tFAvMTw6Hx",
    verifier: TASK_TYPES.DISCORD,
  },
  {
    name: "Join the Sharpe AI Telegram group",
    reward: 500,
    icon: FaTelegramPlane,
    modalButtonText: "Join",
    link: "https://t.me/SharpeAI_Official",
    verifier: TASK_TYPES.TELEGRAM,
  },
];

const BasicTaskScreen = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", title: "", message: "" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const { webApp, user } = useTelegram();
  const userId = user?.id

  const verifyTask = async (taskType, userId) => {
    try {
      const response = await fetch("http://34.93.68.131:8002/verify_telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, unique_id: userId }),
      });
      const data = await response.json();
      return {
        success: data.is_member,
        message: data.is_member
          ? "Task Completed Successfully."
          : "Failed to verify. Please try again.",
      };
    } catch (error) {
      console.error(`Error verifying ${taskType}:`, error);
      return { success: false, message: `Error verifying ${taskType}. Please try again.` };
    }
  };

  const updateTaskStatus = useCallback((taskType, isCompleted) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.verifier === taskType ? { ...task, completed: isCompleted } : task
      )
    );
  }, []);

  const handleCheckClick = async (taskIndex) => {
    setIsChecking(true);
    const task = tasks[taskIndex];

    try {
      const { success, message } = await verifyTask(task.verifier, userId);
      if (success) {
        updateTaskStatus(task.verifier, true);
        setNotification({
          show: true,
          type: "success",
          title: "Success",
          message: message || `Task "${task.name}" completed successfully!`,
        });
        setShowConfetti(true);
        setIsChecking(false)
      } else {
        setNotification({
          show: true,
          type: "warning",
          title: "Task Not Completed",
          message: message || `Unable to verify task: ${task.name}. Please try again.`,
        });
        setIsChecking(false)
      }
    } catch (error) {
      console.error(`Error verifying task: ${task.name}`, error);
      setNotification({
        show: true,
        type: "error",
        title: "Error",
        message: `An error occurred while verifying the task. Please try again later.`,
      });
    } finally {
      setIsChecking(false);
      setIsModalOpen(false); // Close the modal after the check is completed
    }
  };

  useEffect(() => {
    const checkInitialTaskStatus = async () => {
      const { success } = await verifyTask(TASK_TYPES.TELEGRAM, userId);
      updateTaskStatus(TASK_TYPES.TELEGRAM, success);
      setSkeletonVisible(false);
    };

    checkInitialTaskStatus();
  }, [userId, updateTaskStatus]);

  const handleButtonClick = (link) => {
    if (webApp && webApp.openLink) {
      webApp.openLink(link);
    } else {
      window.open(link, "_blank");
    }
  };

  const renderTaskContent = (task, index) => {
    const Icon = task.icon;
    return (
      <div className={`bg-[#0c0c0c] cursor-pointer border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center ${task.completed ? "opacity-70" : ""}`}>
        <div className="flex flex-row items-center gap-2">
          <div className="bg-[#131313] border border-neutral-800 p-[6px] rounded-md">
            <Icon />
          </div>
          <div>
            <p className="font-medium text-[11px] pr-4">{task.name}</p>
          </div>
        </div>
        {task.completed ? (
          <div className="mr-1">
            <FaRegCheckCircle color="#22c55e" size={15} />
          </div>
        ) : (
          <span className="border text-nowrap border-neutral-800 bg-neutral-950 rounded-full text-[10px] px-[6px] py-1">
            +{task.reward} 💎
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <UserInfo />
      <div className="px-2 pb-2 mt-3">
        {tasks.map((task, index) => (
          <Skeleton visible={skeletonVisible} key={index}>
            {task.completed ? (
              renderTaskContent(task, index)
            ) : (
              <Modal
                className="z-20 bg-[#1d1d1d]"
                header={
                  <ModalHeader
                    className="pb-0"
                    after={
                      <ModalClose>
                        <IoClose color="grey" style={{ color: "grey" }} />
                      </ModalClose>
                    }
                  />
                }
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                trigger={renderTaskContent(task, index)}
              >
                <Placeholder className="px-4 pt-4">
                  <div className="bg-[#131313] border border-neutral-800 p-3 rounded-md">
                    <task.icon size={30} />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <p className="font-semibold text-[16px] text-center">{task.name}</p>
                    <span className="border text-center border-neutral-800 bg-[#131313] rounded-full text-[12px] px-2 py-[6px]">
                      +{task.reward} 💎
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <Button
                      className="flex-grow cursor-pointer text-[14px] w-full px-1 font-medium bg-[#98ECFF] text-black py-0 rounded-[4px]"
                      onClick={() => handleButtonClick(task.link)}
                    >
                      {task.modalButtonText}
                    </Button>
                    <Button
                      onClick={() => handleCheckClick(index)}
                      className="w-full cursor-pointer text-[14px] opacity-70 bg-neutral-600 text-black py-1 rounded-[4px] font-medium"
                      disabled={isChecking}
                    >
                      {isChecking ? <Spinner size="s" className="text-[#98ECFF]" /> : "Check"}
                    </Button>
                  </div>
                </Placeholder>
              </Modal>
            )}
          </Skeleton>
        ))}
      </div>
      <Notification
        show={notification.show}
        setShow={(show) => setNotification((prev) => ({ ...prev, show }))}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
      {showConfetti && (
        <Confetti
          mode="boom"
          particleCount={410}
          shapeSize={20}
          launchSpeed={2}
          colors={["#98ecff", "#ff577f", "#ff884b", "#fff9b0"]}
        />
      )}
    </div>
  );
};

export default BasicTaskScreen;