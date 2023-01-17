import React from "react";
import { FaFilter } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { PrimaryButton } from "../../components/Button";
import { InputField } from "../../components/InputField";
import Navbar from "../../components/Navbar/index";
import { SelectOptionBUtton } from "../../components/SelectOptions";
import { optionSort } from "../../constants/DropDownContent";
import { Base2 } from "../../components/Typography";
import styles from "./Contact.module.css";
import BasicTable from "../../components/Table";

export const Contacts = () => {
  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "7.6rem",
        height: "2.7rem",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
        marginTop: "2px",
        // border: "1px solid #5536db",
        // "&:hover": {
        //   border: "1px solid #5536db",
        // },
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "7rem",
        fontSize: "12px",
        fontFamily: "poppins",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 ">
        <div className="flex justify-between">
          <div className="w-1/2">
            <div className="text-2xl poppins font-semibold">Contacts</div>
            <div className="poppins text-md max-w-1/2">
              Contact list stores the list of numbers that you've interacted
              with. You can even manually export or import contacts.
            </div>
          </div>
          <div>
            <PrimaryButton text={"+ Add Contact List"} />
          </div>
        </div>
        <div className={styles.background__color}>
          <div className={styles.Brodcast_section}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Base2 className={styles.sort__text}>Sorted By :</Base2>
                <div className="h-12 ml-3 ">
                  <SelectOptionBUtton
                    className={colourStyles}
                    options={optionSort}
                  />
                </div>
                <div className={styles.input__container}>
                  <InputField
                    placeholder="Search ..."
                    className={"h-10 mt-1"}
                  />
                  <IoSearchOutline
                    className="absolute top-3 right-0"
                    size={"1.6rem"}
                  />
                </div>
                <button className={styles.filter__icon}>
                  <FaFilter
                    size={"1.2rem"}
                    color={"white"}
                    className={styles.filter}
                  />
                </button>
              </div>
              <div className="flex items-center">
                <a className={styles.ationbar__downloadlink}>
                  Download sample Excel
                </a>
                <div className={styles.import_export_icon}>
                  <div className={styles.import_border}>
                    <TfiImport />
                  </div>
                  <div className="p-3">
                    <TfiExport />
                  </div>
                </div>
                <div className="flex ml-5">
                  <div className="ml-4">
                    <input type="radio" />
                    <label for="html" className="ml-2">
                      Rewrite All
                    </label>
                  </div>
                  <div className="ml-4">
                    <input type="radio" />
                    <label for="html" className="ml-2">
                      Skip All
                    </label>
                  </div>
                </div>
                <div className={styles.delete__icon}>
                  <RiDeleteBin5Line
                    size={"1.2rem"}
                    color={"red"}
                    className="absolute"
                  />
                </div>
              </div>
            </div>
          </div>
          <BasicTable />
          <div className="mt-5">hdsgfv</div>
        </div>
      </div>
    </div>
  );
};
