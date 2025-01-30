import React from "react";
import { RxCross1 } from "react-icons/rx";

const PopOver = ({ children, isDisplay, setIsDisplay, Title }) => {
  return (
    <div
      onClick={() => {
        setIsDisplay(false);
      }}
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 ${
        isDisplay ? "flex" : "hidden"
      } justify-center pt-[9vh] pb-[1vh] z-40`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white md:w-[44rem] w-[100%] md:rounded-lg overflow-auto  noScrollBar"
      >
        <div className="flex p-2 justify-between absolute bg-white md:w-[44rem] w-[100%] rounded">
          <b className="text-gray-600 text-lg md:text-xl">{Title}</b>
          <button
            onClick={() => {
              setIsDisplay(false);
            }}
            className="text-lg hover:text-red-500"
          >
            <RxCross1 />
          </button>
        </div>
            <div className="pt-10">
            {children}
            </div>
      </div>
    </div>
  );
};

export default PopOver;
