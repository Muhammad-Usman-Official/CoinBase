import React from "react";

const TextInput = (props: any) => {
  return (
    <div className="flex flex-col gap-y-1">
      <input {...props} />
      {props.error && (
        <p className="text-sm text-red-500">{props.errormessage}</p>
      )}
    </div>
  );
};

export default TextInput;
