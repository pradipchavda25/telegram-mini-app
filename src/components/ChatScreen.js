import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowUpOutline, IoTrashOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import useTelegram from "../context/TelegramContext";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const { user } = useTelegram();
  const userId = user ? user.id : "1051782980";

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const newUserMessage = { type: "user", text: inputText };
    setMessages([...messages, newUserMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("https://miniapp-backend-4dd6ujjz7q-el.a.run.app/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log('data', data);
      
      const newAIMessage = { type: "ai", text: data.response };
      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
    } catch (error) {
      console.error("Error calling API:", error);
      const errorMessage = {
        type: "ai",
        text: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputText.trim() !== '') {
      handleSendMessage();
    }
  };

  const convertTextToJSX = (text) => {
    const lines = text.split("\n");
    let inList = false;

    return lines.map((line, index) => {
      // Handle headings
      if (line.match(/^\d+\./)) {
        inList = false;
        return (
          <h3 key={index} className="font-bold mt-4 mb-2">
            {line}
          </h3>
        );
      }

      // Handle list items
      const listMatch = line.match(/^   [-*]\s(.+)/);
      if (listMatch) {
        if (!inList) {
          inList = true;
          return (
            <ul key={index} className="list-disc list-inside mb-2">
              <li>{processInlineLinks(listMatch[1])}</li>
            </ul>
          );
        }
        return <li key={index}>{processInlineLinks(listMatch[1])}</li>;
      } else {
        inList = false;
      }

      // Regular text
      return (
        <p key={index} className="mb-2">
          {processInlineLinks(line)}
        </p>
      );
    });
  };

  const processInlineLinks = (text) => {
    // Handle both [[number]](url) and [text](url) formats
    const linkRegex = /(\[\[?\d+\]?\])?\(?(https?:\/\/[^\s\)]+)\)?/g;
    const parts = text.split(linkRegex);

    if (parts.length > 1) {
      return parts.map((part, i) => {
        if (i % 3 === 1) {
          return part ? part.replace(/[\[\]]/g, "") : `[${i / 3 + 1}]`;
        } else if (i % 3 === 2) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {parts[i - 1]
                ? parts[i - 1].replace(/[\[\]]/g, "")
                : `[${i / 3}]`}
            </a>
          );
        } else {
          return part;
        }
      });
    }

    return text;
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="h-[calc(100vh-79px)] bg-neutral-950 text-white flex flex-col">
      <div className="flex-1 overflow-y-auto p-3" ref={chatContainerRef}>
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.div
                className="w-16 h-16 border border-neutral-900 bg-gradient-to-r from-[#121212] to-[#000000] rounded-full flex items-center justify-center mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <img src={sharpeLogo} alt="" className="w-10 h-10" />
              </motion.div>

              <motion.h1
                className="text-2xl font-bold mb-2 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Welcome to Sharpe AI Assistant
              </motion.h1>

              <motion.p
                className="text-neutral-400 text-center text-[16px] px-8 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                I'm here to help you with any questions or tasks you may have
              </motion.p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[100%] items-start ${
                    message.type === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.type === "user"
                        ? "bg-[#181818] ml-2"
                        : "bg-gradient-to-r from-[#181818] to-black mr-2"
                    }`}
                  >
                    {message.type === "user" ? (
                      <FaRegUser size={13} />
                    ) : (
                      <img src={sharpeLogo} alt="" />
                    )}
                  </div>
                  <div
                    className={`p-2 max-w-[80%] break-words border border-neutral-900 text-[12px] rounded-lg ${
                      message.type === "user"
                        ? "bg-gradient-to-l from-[#181818] to-black"
                        : "bg-gradient-to-r from-[#181818] to-black"
                    }`}
                  >
                    {message.type === "user"
                      ? message.text
                      : convertTextToJSX(message.text)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex mb-3"
          >
            <motion.div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#181818] to-black flex items-center justify-center mr-2">
              <img src={sharpeLogo} alt="" />
            </motion.div>
            <div className="p-2 border flex items-center border-neutral-900 text-[14px] rounded-lg bg-gradient-to-r from-[#181818] to-black">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-1 h-1 bg-white rounded-full"
                      animate={{
                        y: ["0%", "-50%", "0%"],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-2">
        <div className="bg-[#161616] rounded-full px-3 py-2 flex items-center border border-neutral-800">
          <input
            type="text"
            value={inputText}
            onKeyPress={handleKeyPress}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything..."
            className="flex-grow text-[14px] bg-transparent border-none text-white outline-none placeholder-neutral-500 placeholder:text-[14px]"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={inputText === ""}
            onClick={handleSendMessage}
            className={`rounded-full p-1 transition-colors ${
              inputText === ""
                ? "bg-[#676767] cursor-not-allowed"
                : "bg-gradient-to-r from-[#f0f0f0] to-white cursor-pointer"
            }`}
          >
            <IoArrowUpOutline
              color={inputText === "" ? "#2b2a2a" : "black"}
              size={14}
            />
          </motion.button>
          {messages.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearHistory}
              className={`rounded-full p-1 ml-1 transition-colors ${"bg-gradient-to-r from-[#f0f0f0] to-white cursor-pointer"}`}
            >
              <IoTrashOutline color={"black"} size={14} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
