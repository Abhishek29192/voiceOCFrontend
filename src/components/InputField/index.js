import React from "react";
import styles from "../InputField/InputField.module.css";
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
    <div className="relative">
      <div className="right-0 -top-3 mr-5 text-[0.65rem] absolute">{`${charCountInput}/${maxLength}`}</div>
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
    </div>
  );
};

export const InputFieldWithoutCounter = ({
  placeholder,
  className,
  // showCount,
  value,
  onChange,
  type,
  name,
  id,
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
        id={id}
        name={name}
        className={className}
        type={type}
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

export const FileUploadbutton = ({onChange, fileName}) => {
  return (
    <>
      <input
        type="file"
        hidden
        id="actual-btn"
        name="file"
        onChange={onChange}
        accept=".xlsx, .xls,image/*,.doc, .docx,.mp4,.pdf"
        // value={value}
      />
      <label for="actual-btn" className={`${styles.label} justify-center mr-4`}>
        Upload file
      </label>
      <span className="pr-9 text-sm">{fileName}</span>
    </>
  );
};
