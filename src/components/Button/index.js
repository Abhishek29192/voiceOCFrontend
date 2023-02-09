import React from "react";
import styles from "./Button.module.css";

export const PrimaryButton = ({ text, onClick, className, disabled }) => {
  return (
    <button
      className={`${styles.btn__primary} ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export const SecondaryButton = ({ text, onClick, className }) => {
  return (
    <button
      className={`${styles.btn__secondary} ${className}`}
      onClick={onClick}>
      {text}
    </button>
  );
};

export const ApprovedButton = ({ text, className }) => {
  return (
    <button className={`${styles.Approved_btn} ${className}`}>{text}</button>
  );
};
