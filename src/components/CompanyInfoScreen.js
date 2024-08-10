import React from "react";
import sharpeLogo from "../images/sharpe-white-logo.svg";
import { MdArrowForwardIos } from "react-icons/md";
import { useTab } from "../context/TabContext";

const CompanyInfoScreen = ({ onScreenChange }) => {
  const { setCurrentTab } = useTab();

  const navigateToAnotherScreen = (tabName) => {
    onScreenChange(tabName);
    setCurrentTab(tabName);
  };

  const ecosystemItems = [
    {
      name: "$SAI",
      description: "Official token of Sharpe AI",
      tag: "Token",
      tab: 'saitoken'
    },
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">Sharpe AI</h1>
        <p className="text-neutral-400 text-[16px]">AI-powered Crypto Super App</p>
      </div>

      {/* Menu Items */}
      <div className="space-y-2 mb-6">
        <div className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center" onClick={() => navigateToAnotherScreen('sitecard')}>
          <div className="flex flex-row items-center gap-2">
            <div className="bg-[#131313] border border-neutral-800 p-2 rounded-md">
              <img
                src={sharpeLogo}
                alt=""
                style={{ height: "20px", width: "20px" }}
              />
            </div>
            <div>
              <p className="font-semibold text-[14px]">Overview</p>
              <p className="text-[12px] text-neutral-400">
                Get to know about gmAI
              </p>
            </div>
          </div>

          <MdArrowForwardIos
            color="grey"
            size={12}
            style={{ marginRight: "8px" }}
          />
        </div>
        <div className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center" onClick={() => navigateToAnotherScreen('tokenomics')}>
          <div className="flex flex-row items-center gap-2">
            <div className="bg-[#131313] border border-neutral-800 p-2 rounded-md">
              <img
                src={sharpeLogo}
                alt=""
                style={{ height: "20px", width: "20px" }}
              />
            </div>
            <div>
              <p className="font-semibold text-[14px]">Tokenomics</p>
              <p className="text-[10px] text-neutral-400 pr-8">
                Discover $SAI Tokenomics & token use case
              </p>
            </div>
          </div>

          <MdArrowForwardIos
            color="grey"
            size={12}
            style={{ marginRight: "8px" }}
          />
        </div>
      </div>

      {/* Ecosystem */}
      <h3 className="text-neutral-400 text-[14px] tracking-wide font-semibold mb-2">
        ECOSYSTEM
      </h3>
      <div className="space-y-2">
        {ecosystemItems.map((item, index) => (
          // <div
          //   key={index}
          //   className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between"
          // >
          //   <div className="flex items-center">
          //     <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center mr-3">
          //       {item.icon}
          //     </div>
          //     <div>
          //       <h2 className="font-bold flex items-center">
          //         {item.name}
          //         <span className="ml-2 text-[12px] bg-neutral-700 text-white px-2 py-1 rounded-full">
          //           {item.tag}
          //         </span>
          //       </h2>
          //       <p className="text-sm text-neutral-400">{item.description}</p>
          //     </div>
          //   </div>
          //   <svg
          //     xmlns="http://www.w3.org/2000/svg"
          //     className="h-6 w-6"
          //     fill="none"
          //     viewBox="0 0 24 24"
          //     stroke="currentColor"
          //   >
          //     <path
          //       strokeLinecap="round"
          //       strokeLinejoin="round"
          //       strokeWidth={2}
          //       d="M9 5l7 7-7 7"
          //     />
          //   </svg>
          // </div>
          <div
            key={index}
            className="bg-[#0c0c0c]  border rounded-md border-neutral-700 p-2 mb-2 flex justify-between items-center"
            onClick={() => navigateToAnotherScreen(item.tab)}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="bg-[#131313] border border-neutral-800 p-2 rounded-md">
              <img
                src={sharpeLogo}
                alt=""
                style={{ height: "20px", width: "20px" }}
              />
              </div>
              <div>
                <p className="font-semibold text-[14px] mb-1 flex items-center gap-1">
                  {item.name}
                  <span className="border border-neutral-800 bg-[#131313] rounded-full text-[8px] px-2 py-1">
                    {item.tag}
                  </span>
                </p>
                <p className="text-[10px] text-neutral-400 pr-8">
                  {item.description}
                </p>
              </div>
            </div>

            <MdArrowForwardIos
              color="grey"
              size={12}
              style={{ marginRight: "8px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfoScreen;
