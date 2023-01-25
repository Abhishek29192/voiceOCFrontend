import React, { useState } from "react";

//INPUT FIELD
export const InputField = ({
  placeholder,
  className,
  // showCount,
  value,
  onChange,
  charCountInput,
  maxLength,
}) => {
  return (
    <>
      <div className="float-right mr-5 text-[0.65rem]">{`${charCountInput}/${maxLength}`}</div>
      <input
        placeholder={placeholder}
        style={{
          borderRadius: "5px",
          padding: "5px",
          outline: " none",
        }}
        className={className}
        onChange={onChange}
        // disabled={disableOption}
        value={value}
        maxLength={maxLength !== undefined ? maxLength : 1024}
      />
    </>
  );
};

export const InputFieldWithoutCounter = ({
  placeholder,
  className,
  // showCount,
  value,
  onChange,
}) => {
  return (
    <>
      <input
        placeholder={placeholder}
        style={{
          borderRadius: "5px",
          padding: "5px",
          outline: " none",
        }}
        className={className}
        onChange={onChange}
        // disabled={disableOption}
        value={value}
      />
    </>
  );
};
//TEXT AREA
export const InputTextArea = ({
  placeholder,
  className,
  onChange,
  text,
  charCount,
  maxLength,
}) => {
  return (
    <>
      <p className="float-right mr-5 text-xs">{`${charCount}/${maxLength}`}</p>
      <textarea
        placeholder={placeholder}
        style={{
          backgroundColor: "rgb(241 ,245, 249 )",
          outline: "none",
          borderRadius: "10px",
          width: "97%",
          resize: "none",
        }}
        className={className}
        onChange={onChange}
        value={text}
        maxLength={maxLength !== undefined ? maxLength : 1024}
      />
    </>
  );
};
