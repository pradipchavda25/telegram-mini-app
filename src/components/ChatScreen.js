// import { React, useState, useRef, useEffect } from "react";
// import {
//   Page,
//   Messagebar,
//   Messages,
//   Message,
//   MessagesTitle,
//   Link,
//   Icon,
//   Preloader,
// } from "konsta/react";
// import { ArrowUpCircleFill } from "framework7-icons/react";
// import useTelegram from "../context/TelegramContext";
// import sharpeLogo from "../images/sharpe-white-logo.svg";
// import { motion, AnimatePresence } from "framer-motion";

// const convertTextToJSX = (text) => {
//   const lines = text.split("\n");
//   let inList = false;
//   let listItems = [];
//   let inCodeBlock = false;
//   let codeLines = [];

//   const result = lines.map((line, index) => {
//     // Check for code block
//     if (line.trim().startsWith("```")) {
//       if (inCodeBlock) {
//         inCodeBlock = false;
//         const codeBlock = (
//           <pre
//             key={`code-${index}`}
//             className="bg-[#161616] border border-neutral-800 p-2 rounded mb-2 overflow-x-auto"
//           >
//             <code>{codeLines.join("\n")}</code>
//           </pre>
//         );
//         codeLines = [];
//         return codeBlock;
//       } else {
//         inCodeBlock = true;
//         return null;
//       }
//     }

//     if (inCodeBlock) {
//       codeLines.push(line);
//       return null;
//     }

//     const headingMatch = line.match(/^(\d+)\.\s(.+)/);
//     if (headingMatch) {
//       if (inList) {
//         inList = false;
//         const listElement = (
//           <ul key={`list-${index}`} className="list-disc list-inside mb-2">
//             {listItems}
//           </ul>
//         );
//         listItems = [];
//         return [
//           listElement,
//           <h3 key={index} className="font-bold mt-4 mb-2">
//             {processInlineCode(processInlineLinks(headingMatch[2]))}
//           </h3>,
//         ];
//       }
//       return (
//         <h3 key={index} className="font-bold mt-4 mb-2">
//           {processInlineCode(processInlineLinks(headingMatch[2]))}
//         </h3>
//       );
//     }

//     const listMatch = line.match(/^\s*[-*]\s(.+)/);
//     if (listMatch) {
//       inList = true;
//       listItems.push(
//         <li key={`item-${index}`}>
//           {processInlineCode(processInlineLinks(listMatch[1]))}
//         </li>
//       );
//       return null;
//     } else if (inList) {
//       inList = false;
//       const listElement = (
//         <ul key={`list-${index}`} className="list-disc list-inside mb-2">
//           {listItems}
//         </ul>
//       );
//       listItems = [];
//       return [
//         listElement,
//         <p key={index} className="mb-2">
//           {processInlineCode(processInlineLinks(line))}
//         </p>,
//       ];
//     }

//     return (
//       <p key={index} className="mb-2">
//         {processInlineCode(processInlineLinks(line))}
//       </p>
//     );
//   });

//   if (inList) {
//     result.push(
//       <ul key="final-list" className="list-disc list-inside mb-2">
//         {listItems}
//       </ul>
//     );
//   }

//   return result.flat();
// };

// const processInlineCode = (text) => {
//   if (typeof text === "string") {
//     const parts = text.split("`");
//     return parts.map((part, index) =>
//       index % 2 === 0 ? (
//         part
//       ) : (
//         <code
//           key={index}
//           className="bg-[#161616] border border-neutral-800 px-1 rounded"
//         >
//           {part}
//         </code>
//       )
//     );
//   }
//   return text;
// };

// const processInlineLinks = (text) => {
//   const linkRegex = /(\[(?:\[?\d+\]?|\w+)\])?\(?(https?:\/\/[^\s\)]+)\)?/g;
//   const parts = text.split(linkRegex);

//   if (parts.length > 1) {
//     return parts
//       .map((part, i) => {
//         if (i % 3 === 2) {
//           const linkText = parts[i - 1]
//             ? parts[i - 1].replace(/[\[\]]/g, "")
//             : `${Math.floor((i - 1) / 3) + 1}`;
//           return (
//             <a
//               key={i}
//               href={part}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-400 hover:underline"
//             >
//               [{linkText}]
//             </a>
//           );
//         } else if (i % 3 !== 1) {
//           return part;
//         }
//         // Skip parts that are i % 3 === 1
//       })
//       .filter(Boolean); // Remove undefined elements
//   }

//   return text;
// };

// export default function ChatUI() {
//   const [messageText, setMessageText] = useState("");
//   const [messagesData, setMessagesData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { user } = useTelegram();
//   const userIdForDev = user?.id || "1051782981"; // Use user.id if available, otherwise default to "1051782980"
// const userIdForProd = user?.id; // Use user.id directly in production
// const userId = process.env.NODE_ENV === "production" ? userIdForProd : userIdForDev;
//   const ApiBaseUrl =
//     process.env.NODE_ENV === "production"
//       ? process.env.REACT_APP_PUBLIC_API_URL
//       : process.env.REACT_APP_PUBLIC_LOCAL_API_URL;

//   const pageRef = useRef();
//   const initiallyScrolled = useRef(false);

//   const scrollToBottom = () => {
//     const pageElement = pageRef.current.current || pageRef.current.el;
//     pageElement.scrollTo({
//       top: pageElement.scrollHeight - pageElement.offsetHeight,
//       behavior: initiallyScrolled.current ? "smooth" : "auto",
//     });
//   };

//   useEffect(() => {
//     scrollToBottom();
//     initiallyScrolled.current = true;
//   }, [messagesData]);

//   const handleSendClick = async () => {
//     const text = messageText.replace(/\n/g, "<br>").trim();
//     if (text.length === 0) return;

//     const newMessage = { text, type: "sent" };
//     setMessagesData([...messagesData, newMessage]);
//     setMessageText("");
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${ApiBaseUrl}/rag`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           message: text,
//         }),
//       });

//       if (response.status === 429) {
//         const errorData = await response.json();
//         const errorMessage = {
//           type: "received",
//           text: (
//             <span style={{ color: "#cb2e2e" }}>{errorData.message}</span>
//           ),
//           name: "Brownian AI",
//           avatar: "../images/image.png",
//         };
//         setMessagesData((prevMessages) => [...prevMessages, errorMessage]);
//       } else {
//         const data = await response.json();
//         const botResponse = {
//           type: "received",
//           text: convertTextToJSX(data.response),
//           name: "Brownian AI",
//           avatar: "../images/image.png",
//         };

//         setMessagesData((prevMessages) => [...prevMessages, botResponse]);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       const errorMessage = {
//         type: "received",
//         text: "Sorry, there was an error processing your request.",
//         name: "Brownian AI",
//         avatar: "../images/image.png",
//       };
//       setMessagesData((prevMessages) => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const inputOpacity = messageText ? 1 : 0.3;
//   const isClickable = messageText.trim().length > 0;

//   const currentDate = new Intl.DateTimeFormat("en-US", {
//     weekday: "long",
//     month: "short",
//     day: "numeric",
//     hour12: false,
//     hour: "2-digit",
//     minute: "2-digit",
//   })
//     .formatToParts(new Date())
//     .map((part) => {
//       if (["weekday", "month", "day"].includes(part.type)) {
//         return <b key={part.type}>{part.value}</b>;
//       }
//       return part.value;
//     });

//   return (
//     <Page
//       className="ios:bg-black ios:dark:bg-black"
//       ref={pageRef}
//       style={{
//         height: "calc(100vh - 75px)",
//         paddingBottom: "10px",
//       }}
//     >
//       <AnimatePresence>
//         {messagesData.length === 0 ? (
//           <motion.div
//             key="welcome"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col items-center justify-center h-full"
//           >
//             <motion.div
//               className="w-16 h-16 border border-neutral-900 bg-gradient-to-r from-[#121212] to-[#000000] rounded-full flex items-center justify-center mb-4"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//             >
//               <img src={sharpeLogo} alt="" className="w-10 h-10" />
//             </motion.div>
//             <motion.h1
//               className="text-2xl text-white font-bold mb-2 text-center"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >
//               Hey there! Welcome to Brownian
//             </motion.h1>
//             <motion.p
//               className="text-neutral-400 text-center text-[16px] px-8 mb-6"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//             >
//               Got something on your mind? Just ask away, and let's get the
//               conversation going!
//             </motion.p>
//           </motion.div>
//         ) : (
//           <Messages style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '0px !important' }}>
//             <MessagesTitle
//               colors={{
//                 titleMd: "text-md-dark-on-surface-variant",
//               }}
//               style={{ marginBottom: "10px" }}
//             >
//               {currentDate}
//             </MessagesTitle>
//             {messagesData.map((message, index) => (
//               <Message
//                 colors={{
//                   bubbleSentMd: "#007AFF",
//                   bubbleReceivedIos: "bg-[#252525]",
//                 }}
//                 key={index}
//                 type={message.type}
//                 name={message.name}
//                 text={message.text}
//                 style={{ fontSize: "16px", color: "white" }}
//                 avatar={
//                   message.type === "received" && (
//                     <img
//                       alt="avatar"
//                       src={sharpeLogo}
//                       className="w-8 h-8 rounded-full p-[3px] border border-neutral-900"
//                     />
//                   )
//                 }
//               />
//             ))}
//             {isLoading && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex mb-3"
//               >
//                 <Message
//                   type="received"
//                   colors={{
//                     bubbleReceivedIos: "bg-[#252525]",
//                   }}
//                   text={
//                     <div className="flex items-center space-x-2">
//                       <div className="flex space-x-1 py-1">
//                         {[0, 1, 2].map((index) => (
//                           <motion.div
//                             key={index}
//                             className="w-1 h-1 bg-white rounded-full"
//                             animate={{
//                               y: ["0%", "-50%", "0%"],
//                             }}
//                             transition={{
//                               duration: 0.6,
//                               repeat: Infinity,
//                               ease: "easeInOut",
//                               delay: index * 0.2,
//                             }}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   }
//                   avatar={
//                     <img
//                       alt="avatar"
//                       src={sharpeLogo}
//                       className="w-6 h-6 rounded-full border border-neutral-800"
//                     />
//                   }
//                 />
//               </motion.div>
//             )}
//           </Messages>
//         )}
//       </AnimatePresence>
//       <Messagebar
//         style={{
//           bottom: "75px",
//           background: "#000",
//           fontSize: "16px",
//           color: "#fff",
//           borderColor: "#1a1a1a",
//         }}
//         placeholder="Ask anything..."
//         value={messageText}
//         colors={{
//           bgIos: "#252525",
//           borderIos: " border-[#c8c8cd] border-opacity-30",
//         }}
//         outline={false}
//         onInput={(e) => setMessageText(e.target.value)}
//         right={
//           <Link
//             onClick={isClickable && !isLoading ? handleSendClick : undefined}
//             toolbar
//             style={{
//               opacity: inputOpacity,
//               cursor: isClickable && !isLoading ? "pointer" : "default",
//             }}
//           >
//             <Icon
//               ios={
//                 <ArrowUpCircleFill
//                   className="w-8 h-8"
//                   style={{ color: "#fff" }}
//                 />
//               }
//             />
//           </Link>
//         }
//       />
//     </Page>
//   );
// }

import { React, useState, useRef, useEffect } from "react";
import {
  Page,
  Navbar,
  Messagebar,
  Messages,
  Message,
  MessagesTitle,
  Link,
  Icon,
} from "konsta/react";
import { ArrowUpCircleFill } from "framework7-icons/react";
import { MdSend } from "react-icons/md";
import useTelegram from "../context/TelegramContext";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import { motion } from "framer-motion";
import { useTab } from "../context/TabContext";

const convertTextToJSX = (text) => {
  const lines = text.split("\n");
  let inList = false;
  let listItems = [];
  let inCodeBlock = false;
  let codeLines = [];

  const result = lines.map((line, index) => {
    // Check for code block
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const codeBlock = (
          <pre
            key={`code-${index}`}
            className="bg-[#161616] border border-neutral-800 p-2 rounded mb-2 overflow-x-auto"
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        return codeBlock;
      } else {
        inCodeBlock = true;
        return null;
      }
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return null;
    }

    const headingMatch = line.match(/^(\d+)\.\s(.+)/);
    if (headingMatch) {
      if (inList) {
        inList = false;
        const listElement = (
          <ul key={`list-${index}`} className="list-disc list-inside mb-2">
            {listItems}
          </ul>
        );
        listItems = [];
        return [
          listElement,
          <h3 key={index} className="font-bold mt-4 mb-2">
            {processInlineCode(processInlineLinks(headingMatch[2]))}
          </h3>,
        ];
      }
      return (
        <h3 key={index} className="font-bold mt-4 mb-2">
          {processInlineCode(processInlineLinks(headingMatch[2]))}
        </h3>
      );
    }

    const listMatch = line.match(/^\s*[-*]\s(.+)/);
    if (listMatch) {
      inList = true;
      listItems.push(
        <li key={`item-${index}`}>
          {processInlineCode(processInlineLinks(listMatch[1]))}
        </li>
      );
      return null;
    } else if (inList) {
      inList = false;
      const listElement = (
        <ul key={`list-${index}`} className="list-disc list-inside mb-2">
          {listItems}
        </ul>
      );
      listItems = [];
      return [
        listElement,
        <p key={index} className="mb-2">
          {processInlineCode(processInlineLinks(line))}
        </p>,
      ];
    }

    return (
      <p key={index} className="mb-2">
        {processInlineCode(processInlineLinks(line))}
      </p>
    );
  });

  if (inList) {
    result.push(
      <ul key="final-list" className="list-disc list-inside mb-2">
        {listItems}
      </ul>
    );
  }

  return result.flat();
};

const processInlineCode = (text) => {
  if (typeof text === "string") {
    const parts = text.split("`");
    return parts.map((part, index) =>
      index % 2 === 0 ? (
        part
      ) : (
        <code
          key={index}
          className="bg-[#161616] border border-neutral-800 px-1 rounded"
        >
          {part}
        </code>
      )
    );
  }
  return text;
};

const processInlineLinks = (text) => {
  const linkRegex = /(\[(?:\[?\d+\]?|\w+)\])?\(?(https?:\/\/[^\s\)]+)\)?/g;
  const parts = text.split(linkRegex);

  if (parts.length > 1) {
    return parts
      .map((part, i) => {
        if (i % 3 === 2) {
          const linkText = parts[i - 1]
            ? parts[i - 1].replace(/[\[\]]/g, "")
            : `${Math.floor((i - 1) / 3) + 1}`;
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              [{linkText}]
            </a>
          );
        } else if (i % 3 !== 1) {
          return part;
        }
        // Skip parts that are i % 3 === 1
      })
      .filter(Boolean); // Remove undefined elements
  }

  return text;
};

export default function ChatUI({ onScreenChange }) {
  const [messageText, setMessageText] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useTelegram();
  const { setCurrentTab } = useTab();

  const userIdForDev = user?.id || "1051782982"; // Use user.id if available, otherwise default to "1051782980"
  const userIdForProd = user?.id; // Use user.id directly in production
  const userId =
    process.env.NODE_ENV === "production" ? userIdForProd : userIdForDev;
  const ApiBaseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PUBLIC_API_URL
      : process.env.REACT_APP_PUBLIC_LOCAL_API_URL;

  const pageRef = useRef();
  const initiallyScrolled = useRef(false);

  const scrollToBottom = () => {
    const pageElement = pageRef.current.current || pageRef.current.el;
    pageElement.scrollTo({
      top: pageElement.scrollHeight - pageElement.offsetHeight,
      behavior: initiallyScrolled.current ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    scrollToBottom();
    initiallyScrolled.current = true;
  }, [messagesData]);

  const handleSendClick = async () => {
    const text = messageText.replace(/\n/g, "<br>").trim();
    if (text.length === 0) return;

    const newMessage = { text, type: "sent" };
    setMessagesData([...messagesData, newMessage]);
    setMessageText("");
    setIsLoading(true);

    try {
      const response = await fetch(`${ApiBaseUrl}/rag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: text,
        }),
      });

      if (response.status === 429) {
        const errorData = await response.json();
        const errorMessage = {
          type: "received",
          text: <span style={{ color: "#cb2e2e" }}>{errorData.message}</span>,
          name: "Brownian AI",
          avatar: "../images/image.png",
        };
        setMessagesData((prevMessages) => [...prevMessages, errorMessage]);
      } else {
        const data = await response.json();
        const botResponse = {
          type: "received",
          text: convertTextToJSX(data.response),
          name: "Brownian AI",
          avatar: "../images/image.png",
        };

        setMessagesData((prevMessages) => [...prevMessages, botResponse]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        type: "received",
        text: "Sorry, there was an error processing your request.",
        name: "Brownian AI",
        avatar: "../images/image.png",
      };
      setMessagesData((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const inputOpacity = messageText ? 1 : 0.3;
  const isClickable = messageText.trim().length > 0;

  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
    setCurrentTab(tabName);
  };

  const handleClear = () => {
    setMessagesData([]);
  };

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })
    .formatToParts(new Date())
    .map((part) => {
      if (["weekday", "month", "day"].includes(part.type)) {
        return <b key={part.type}>{part.value}</b>;
      }
      return part.value;
    });

  return (
    <Page className="ios:bg-black ios:dark:bg-black" ref={pageRef}>
      <Navbar
        colors={{ textIos: "text-white", bgIos: 'bg-black' }}
        style={{ borderBottom: "1px solid #383838" }}
        transparent
        className="top-0 sticky"
        right={
          <Link
            navbar
            colors={{ navbarTextIos: "text-white" }}
            onClick={handleClear}
          >
            Clear
          </Link>
        }
        left={
          <Link
            navbar
            colors={{ navbarTextIos: "text-white" }}
            onClick={() => navigateToAnotherScreen("home")}
          >
            Home
          </Link>
        }
      />
      {messagesData.length === 0 ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mt-[60px]"
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
            className="text-2xl text-white font-bold mb-2 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Hey there! Welcome to Brownian
          </motion.h1>
          <motion.p
            className="text-neutral-400 text-center text-[16px] px-8 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Got something on your mind? Just ask away, and let's get the
            conversation going!
          </motion.p>
        </motion.div>
      ) : (
        <Messages>
          <MessagesTitle>{currentDate}</MessagesTitle>
          {messagesData.map((message, index) => (
            <Message
              key={index}
              type={message.type}
              name={message.name}
              text={message.text}
              style={{ fontSize: "16px", color: "white" }}
              colors={{
                bubbleReceivedIos: "bg-[#252525]",
              }}
              avatar={
                message.type === "received" && (
                  <img
                    alt="avatar"
                    src={sharpeLogo}
                    className="w-6 h-6 rounded-full border border-neutral-800"
                  />
                )
              }
            />
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex mb-3"
            >
              <Message
                type="received"
                colors={{
                  bubbleReceivedIos: "bg-[#252525]",
                }}
                text={
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1 py-1">
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
                }
                avatar={
                  <img
                    alt="avatar"
                    src={sharpeLogo}
                    className="w-6 h-6 rounded-full border border-neutral-800"
                  />
                }
              />
            </motion.div>
          )}
        </Messages>
      )}
      <Messagebar
        colors={{
          bgIos: "bg-black",
          borderIos: "border-[#c8c8cd] border-opacity-30",
          placeholderIos: "placeholder-opacity-40",
          toolbarIconIos: "fill-md-dark-primary",
        }}
        style={{
          fontSize: "16px",
          color: "#fff",
          borderColor: "#1a1a1a",
        }}
        placeholder="Ask Anything..."
        value={messageText}
        onInput={(e) => setMessageText(e.target.value)}
        right={
          <Link
            onClick={isClickable ? handleSendClick : undefined}
            toolbar
            style={{
              opacity: inputOpacity,
              cursor: isClickable ? "pointer" : "default",
            }}
          >
            <Icon
              ios={
                <ArrowUpCircleFill
                  className="w-7 h-7"
                  style={{ color: "#fff" }}
                />
              }
              material={
                <MdSend className="w-6 h-6 fill-black dark:fill-md-dark-on-surface" />
              }
            />
          </Link>
        }
      />
    </Page>
  );
}
