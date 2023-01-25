import React from "react";
import styles from "./Button.module.css";

export const PrimaryButton = ({ text, onClick }) => {
  return (
    <button className={styles.btn__primary} onClick={onClick}>
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

export const ApprovedButton = () => {
  return <button className={styles.Approved_btn}>Approved</button>;
};
