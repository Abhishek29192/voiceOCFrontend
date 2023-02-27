import React, { useState } from "react";
import BroadcastOptions from "../../../components/BroadcastOptions";
import { PrimaryButton } from "../../../components/Button";
import Navbar from "../../../components/Navbar";
import { Base2 } from "../../../components/Typography";
import styles from "./BroadcastHistory.module.css";
import { NewBroadCast } from "./NewBroadCast";
import { DatePickers } from "../../../components/datePicker/index";
import { SelectOptionButton } from "../../../components/SelectOptions";
import { optionSort } from "../../../constants/DropDownContent";
import { BrodcastHistoryOverview } from "../../../components/BroadcastHistoryOverview/BrodcastHistoryOverview";
import { IoSearchOutline } from "react-icons/io5";
import { InputFieldWithoutCounter } from "../../../components/InputField";
import ContactTable from "../../../components/Table/contactTable";

export const BroadcastHistory = () => {
  const [newBroadcastPopup1, setNewBroadcastPopup1] = useState(false);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'broadcastName',
      // renderCell: (params) => {
      //   return (
      //     <div className="flex flex-wrap text-2xl">
      //       headerName: 'First name',
      //     </div>
      //   );
      // },
      // headerName: 'First name',
      renderHeader: (params) => (
        <p className='text-lg font-bold ml-5' >Broadcast name
          Scheduled</p>
      ),
      width: 145,
      editable: true,
    },
    {
      field: 'successful',
      renderHeader: (params) => (
        <p className='text-lg font-bold ml-5' >Successful</p>
      ),
      // headerName: 'First name',
      width: 140,
      editable: true,
    },
    {
      field: 'read',
      // renderCell: (params) => {
      //   return (
      //     <div className="flex flex-wrap text-2xl">
      //       headerName: 'First name',
      //     </div>
      //   );
      // },
      renderHeader: (params) => (
        <p className='text-lg font-bold ml-5' >Read</p>
      ),
      // headerName: 'First name',
      width: 140,
      editable: true,
    },
    {
      field: 'replied',
      // renderCell: (params) => {
      //   return (
      //     <div className="flex flex-wrap text-2xl">
      //       headerName: 'First name',
      //     </div>
      //   );
      // },
      renderHeader: (params) => (
        <p className='text-lg font-bold ml-5' >Replied</p>
      ),
      // headerName: 'First name',
      width: 140,
      editable: true,
    },
    {
      field: 'status',
      renderHeader: (params) => (
        <p className='text-lg font-bold ml-5' >Status</p>
      ),
      // headerName: 'Last name',
      width: 140,
      editable: true,
    },
    // {
    //   field: 'lastName',
    //   headerName: 'Last name',
    //   width: 140,
    //   editable: true,
    // },

    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 100,
    //   editable: true,
    // },
    {
      field: 'Failed',
      headerName: 'Failed',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 140,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 2, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 3, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 4, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 5, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 6, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 7, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 8, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
    { id: 9, broadcastName: "Abhi1", successful: "true", read: "true", replied: "true", status: "pending", Failed: "--" },
  ];


  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "14rem",
        height: "3.4rem",
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

  const colourStyles1 = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "9rem",
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
      <div className="flex">
        <BroadcastOptions />
        <div className="flex flex-col w-[80%]">
          <div className={styles.section1}>
            <Base2 className="poppins p-3">Date Range Filter</Base2>
            <PrimaryButton
              text={"New BroadCast"}
              className="mr-7"
              onClick={() => setNewBroadcastPopup1(true)}
            />
          </div>
          <div className="h-fit items-center pl-2 w-[85%]">
            <div className="flex mx-2 p-2 w-fit">
              <div className="w-1/3 m-2 ml-2">
                <DatePickers label={"Date picker from"} />
              </div>
              <div className="w-1/3 m-2">
                <DatePickers label={"Date picker to"} />
              </div>
              <div className="h-17 w-1/3 p-[0.34rem] justify-center items-center">
                <SelectOptionButton
                  className={colourStyles}
                  options={optionSort}
                />
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <div className="">
            <Base2 className="poppins p-3">Overview</Base2>
            <div className="flex flex-wrap pr-3 pl-3">
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview />
              </div>
            </div>
            <div className={styles.broadcast__list}>
              <Base2 className="poppins font-extrabold text-[1.2rem]">
                Broadcast list
              </Base2>
              <div className="flex items-center pl-8">
                <Base2 className={styles.sort__text}>Sorted By :</Base2>
                <div className="h-12 ml-2 ">
                  <SelectOptionButton
                    className={colourStyles1}
                    options={optionSort}
                  />
                </div>
              </div>
              <div className={`${styles.input__container} w-[70%] ml-7`}>
                <InputFieldWithoutCounter
                  type={'text'}
                  placeholder="Search ..."
                  className={"h-10"}
                />
                <IoSearchOutline
                  className="absolute top-[0.65rem] right-2"
                  size={"1.6rem"}
                />
              </div>
            </div>
            <div className="p-5">
              <ContactTable
                tableContent="broadcastData" // rows={createData(data?.data)}
                rows={rows}
                columns={columns}
                rowHeight={140}
              // checkboxSelection
              // onSelectionModelChange={onSelectionModelChange}
              />
            </div>
          </div>
        </div>
      </div>
      {newBroadcastPopup1 && (
        <NewBroadCast
          isOpen={newBroadcastPopup1}
          onClose={() => setNewBroadcastPopup1(false)}
          className={`${styles.customModal}`}
        />
      )}
    </div>
  );
};
