import { Button, Modal, Placeholder, Skeleton, Spinner } from "@telegram-apps/telegram-ui";
import React, { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { IoClose } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import Notification from "./notification/Notification";

const DailyTasks = () => {
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCheckClick = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setShowWarning(true); // Show warning notification after checking
    }, 2000); // Spinner will load for 2 seconds
  };


  const tasks = [
    {
      name: "Follow Sharpe AI on Twitter",
      reward: 16500,
      icon: FaXTwitter,
      completed: false, // Task not completed
      modalButtonText: "Follow",
      link: "https://x.com/SharpeLabs", // Twitter link
    },
    {
      name: "Join the Sharpe AI Discord server",
      reward: 16500,
      icon: FaDiscord,
      completed: false, // Task not completed
      modalButtonText: "Join",
      link: "https://discord.com/invite/tFAvMTw6Hx", // Discord link
    },
    {
      name: "Join the Sharpe AI Telegram group",
      reward: 500,
      icon: FaTelegramPlane,
      completed: true, // Task completed
      modalButtonText: "Join",
      link: "https://t.me/SharpeAI_Official", // Telegram link
    },
  ];
  
  const handleButtonClick = (link) => {
    window.open(link);
  };

  return (
    <div className="">
      <UserInfo />
      <div className="px-2 pb-2 mt-3">
        {tasks.map((task, index) => {
          const Icon = task.icon;
          const taskContent = (
            <div
            key={index}
            className={`bg-[#0c0c0c] cursor-pointer border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center ${
              task.completed ? "opacity-70" : ""
            }`}
          >
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

          return (
            <Skeleton visible={skeletonVisible} key={index}>
              {task.completed ? (
                taskContent
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
                    ></ModalHeader>
                  }
                  trigger={taskContent}
                >
                  <Placeholder className="px-4 pt-4">
                    <div className="bg-[#131313] border border-neutral-800 p-3 rounded-md">
                      <Icon size={30} />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1">
                      <p className="font-semibold text-[18px]">{task.name}</p>
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
                        onClick={handleCheckClick}
                        className="w-full cursor-pointer text-[14px] opacity-70 bg-neutral-600 text-black py-1 rounded-[4px] font-medium"
                      >
                        {isChecking ? (
                          <Spinner size="s" className="text-[#98ECFF]" />
                        ) : (
                          "Check"
                        )}
                      </Button>
                    </div>
                  </Placeholder>
                </Modal>
              )}
            </Skeleton>
          );
        })}
      </div>
      {showWarning && (
        <Notification
          show={showWarning}
          setShow={setShowWarning}
          type="success"
          title="Warning"
          message="This is a relevant notification after the check"
        />
      )}
    </div>
  );
};

export default DailyTasks;
