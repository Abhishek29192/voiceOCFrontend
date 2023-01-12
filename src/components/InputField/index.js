import React, { useState } from "react";

//INPUT FIELD
export const InputField = ({ placeholder, className, showCount }) => {
  const [charCount, setCharCount] = useState(0);
  const [disableOption, setDisableOption] = useState(false);
  const calCount = (e) => {
    setCharCount(e.target.value.length);
    if (charCount >= 59) {
      setDisableOption(true);
    }
  };
  return (
    <>
      {showCount ? (
        <p className="float-right mr-5 text-xs">{`${charCount}/60`}</p>
      ) : (
        ""
      )}
      <input
        placeholder={placeholder}
        style={{
          borderRadius: "5px",
          padding: "5px",
          outline: " none",
        }}
        className={className}
        onChange={calCount}
        disabled={disableOption}
      />
    </>
  );
};

//TEXT AREA
export const InputTextArea = ({ placeholder, className, onChange }) => {
  const [textAreaCount, setTextAreaCount] = useState(0);
  const [disableTextArea, setDisableTextArea] = useState(false);

  const recalculate = (e) => {
    setTextAreaCount(e.target.value.length);
    if (textAreaCount >= 1024) setDisableTextArea(true);
  };

  return (
    <>
      <p className="float-right mr-5 text-xs">{`${textAreaCount}/1024`}</p>
      <textarea
        placeholder={placeholder}
        style={{
          backgroundColor: "rgb(241 ,245, 249 )",
          outline: "none",
          borderRadius: "10px",
          width: "97%",
        }}
        className={className}
        onChange={recalculate}
      />
    </>
  );
};
