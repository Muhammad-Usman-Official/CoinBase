import React from "react";
import Spinner from "./Spinner";

const Loader = ({ text, absolute }: { text: string; absolute: boolean }) => {
  return (
    <pre
      className={`${
        absolute ? "absolute left-[50%] top-[50%]" : ""
      } flex gap-y-2 flex-col justify-center scale-[200%] w-20 h-20`}
    >
      <div className="ml-3">
        <Spinner />
      </div>
      <span>{text}</span>
    </pre>
  );
};

export default Loader;
