import React from "react";
import "./Button.css";

export const PrimaryButton = ({ text, onClick }) => {
  return (
    <button className="btn__primary" onClick={onClick}>
      {text}
    </button>
  );
};

export const SecondaryButton = ({ text, onClick, className }) => {
  return (
    <button className={`btn__secondary ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
