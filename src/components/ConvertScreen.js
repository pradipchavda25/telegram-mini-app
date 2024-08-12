import React from "react";
import { IoArrowDown } from "react-icons/io5";
import sharpeLogo from "../images/sharpe-white-logo.svg";



const ConvertScreen = ({userPoints}) => {

  const stats = [
    { name: "Snapshot diamonds", value: `💎 ${userPoints}` },
    { name: "Converted diamonds", value: "💎 0" },
  ];
  
  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-1">Convert to $SAI</h1>
      <p className="text-neutral-400 text-[14px] text-center">
        the more diamonds own,
      </p>
      <p className="text-neutral-400 text-[14px] mb-3 text-center">
        the more $SAI you will have.
      </p>
      <div className="bg-[#0c0c0c] border rounded-[8px] border-neutral-950">
        <div className="mx-auto rounded-[8px]">
          <div className="grid grid-cols-2 rounded-[8px] gap-px">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-neutral-900  px-2 py-2">
                <p className="text-[12px] text-center text-neutral-400">
                  {stat.name}
                </p>
                <p className="mt-1 flex justify-center gap-x-2">
                  <span className="text-[16px] font-semibold tracking-tight text-center text-white">
                    {stat.value}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Airdrop Snapshot */}
      <div className="bg-[#0c0c0c] border rounded-md border-neutral-700 p-4 mt-4 mb-4">
        <h2 className="text-[18px] text-center font-semibold mb-2">
          Airdrop Snapshot Phase One
        </h2>
        <p className="text-[12px] text-center text-neutral-400">
          The conversion period will end in the next
        </p>
        <p className="text-[12px] text-center font-bold text-neutral-400 mb-2">
          00 Hours
        </p>
        <div className="bg-[#121212] border border-neutral-700 rounded p-2 text-center">
          <p className="text-green-500 text-2xl font-semibold">00:00:00</p>
        </div>
      </div>

      {/* Conversion Info */}
      <p className="text-[12px] px-6 text-center  mb-4">
        You need at least{" "}
        <span className="text-green-400 font-bold">20,000</span> diamonds to
        convert them into <span className="text-green-500 font-bold">$SAI</span>
      </p>

      {/* Conversion Options */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { diamonds: 1000, time: 1 },
          { diamonds: 2000, time: 2 },
          { diamonds: 5000, time: 7 },
          { diamonds: 10000, time: 17 },
          { diamonds: 20000, time: 41 },
          { diamonds: 50000, time: 124 },
        ].map((option, index) => (
          <button
          disabled
            key={index}
            className="bg-[#121212] cursor-pointer disabled:text-neutral-600 border rounded-md border-neutral-700 p-4 text-center"
          >
            <p className="font-bold text-[16px] text-center">
              💎 {option.diamonds.toLocaleString()}
            </p>
            {option.time && (
              <>
                <div className="flex justify-center py-1">
                  <IoArrowDown color="grey" size={15} />
                </div>
                <p className="flex justify-center gap-1 items-center"><img src={sharpeLogo} alt="" style={{height: '20px', width: '20px'}} /> {option.time}</p>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Convert Button */}
      <button disabled className="w-full text-[16px] cursor-pointer bg-[#98ECFF] disabled:text-white disabled:bg-neutral-800  text-black py-2 rounded-md font-medium">
        Convert
      </button>
    </div>
  );
};

export default ConvertScreen;
