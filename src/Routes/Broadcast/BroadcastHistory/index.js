import React, {useState} from "react";
import BroadcastOptions from "../../../components/BroadcastOptions";
import {PrimaryButton} from "../../../components/Button";
import Navbar from "../../../components/Navbar";
import {Base2} from "../../../components/Typography";
import styles from "./BroadcastHistory.module.css";
import {NewBroadCast} from "./NewBroadCast";
import {DatePickers} from "../../../components/datePicker/index";
import {SelectOptionButton} from "../../../components/SelectOptions";
import {optionSort} from "../../../constants/DropDownContent";
import {BrodcastHistoryOverview} from "../../../components/BroadcastHistoryOverview/BrodcastHistoryOverview";
import {IoSearchOutline} from "react-icons/io5";
import {InputFieldWithoutCounter} from "../../../components/InputField";
import ContactTable from "../../../components/Table/contactTable";
import {RiCheckDoubleLine} from "react-icons/ri";
import {BiCheck} from "react-icons/bi";
import {AiOutlineEye, AiOutlineSend} from "react-icons/ai";
import {TbCornerUpLeftDouble} from "react-icons/tb";
import {MdOutlineSmsFailed} from "react-icons/md";
import {HiOutlineArrowPath, HiOutlineQueueList} from "react-icons/hi2";
import {
  useBroadcastDataHistoryOveraAllStatus,
  useBroadcastHistoryTabelData,
} from "../../../hooks/useQueryApi";
import {BsBarChart} from "react-icons/bs";
import {useEffect} from "react";
import moment from "moment/moment";
import {Drawers} from "../../../components/Drawer/Drawer";
import {Profile} from "../../TeamInbox/Profile";

export const BroadcastHistory = () => {
  const [rows, setrows] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [boradcastHistoryTabelData, setBroadcastHistoryTabelData] = useState();
  const [boradcastHistoryStatusData, setBroadcastHistoryStatusData] =
    useState();
  const [newBroadcastPopup1, setNewBroadcastPopup1] = useState(false);
  const {refetch} = useBroadcastHistoryTabelData();
  const {refetch: getAllStatus, isFetching} =
    useBroadcastDataHistoryOveraAllStatus();

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
    option: (styles, {data, isDisabled}) => {
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
    option: (styles, {data, isDisabled}) => {
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

  useEffect(() => {
    refetch()
      .then((res) => setBroadcastHistoryTabelData(res?.data?.data))
      .catch((err) => console.log(err));
    getAllStatus()
      .then((res) => setBroadcastHistoryStatusData(res?.data?.data, "dchg"))
      .catch((err) => console.log(err, "err"));
  }, []);

  // boradcastHistoryStatusData?.filter(e => { if (e.name === "READ") { console.log(e.count) } })

  const columns = [
    {
      field: "dateTime",
      renderHeader: (params) => <p className="text-lg font-bold ml-5">Date</p>,
      width: 120,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "broadcastName",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Broadcast name Scheduled</p>
      ),
      width: 180,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "successful",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Successful</p>
      ),
      renderCell: (params) => {
        if (params.row.successful > 0) {
          return (
            <div className="rounded-full h-20 w-20 bg-[#5536db] flex items-center justify-center">
              <div className=" rounded-full h-16 w-16 bg-white flex items-center justify-center">
                100%
              </div>
            </div>
          );
        } else {
          return (
            <div className="rounded-full h-20 w-20 bg-slate-300 flex items-center justify-center">
              <div className=" rounded-full h-16 w-16 bg-white flex items-center justify-center">
                0%
              </div>
            </div>
          );
        }
      },
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "read",
      renderHeader: (params) => <p className="text-lg font-bold ml-5">Read</p>,
      renderCell: (params) => {
        if (params.row.read > 0) {
          return (
            <div className="rounded-full h-20 w-20 bg-[#5536db] flex items-center justify-center">
              <div className=" rounded-full h-16 w-16 bg-white flex items-center justify-center">
                100%
              </div>
            </div>
          );
        } else {
          return (
            <div className="rounded-full h-20 w-20 bg-slate-300 flex items-center justify-center">
              <div className=" rounded-full h-16 w-16 bg-white flex items-center justify-center">
                0%
              </div>
            </div>
          );
        }
      },
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "replied",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Replied</p>
      ),
      renderCell: (params) => {
        if (params.row.replied === 1) {
          return (
            <div className="rounded-full h-20 w-20 bg-[#5536db] flex items-center justify-center">
              <div className=" rounded-full h-16 w-16 bg-white flex items-center justify-center">
                100%
              </div>
            </div>
          );
        } else {
          return (
            <div className="rounded-full h-20 w-20 bg-slate-300 flex items-center justify-center">
              <div className=" rounded-full h-16 w-16 bg-white flex items-center justify-center">
                0%
              </div>
            </div>
          );
        }
      },
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      renderHeader: (params) => <p className="text-lg font-bold ">Status</p>,
      renderCell: (params) => {
        if (params.row.Status) {
          return <p className="font-semibold">{params.row.Status}</p>;
        } else {
          return <p className="font-semibold">{params.row.Status}</p>;
        }
      },
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Failed",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Actions</p>
      ),
      align: "center",
      width: 120,
      editable: true,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex">
            <div className="border-[1px] p-1 rounded mx-3">
              {" "}
              <BsBarChart size={"1.4rem"} />
            </div>
            <div className="border-[1px] p-1 rounded ">
              <AiOutlineEye size={"1.5rem"} />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (boradcastHistoryTabelData) {
      let data = boradcastHistoryTabelData?.map((e) => ({
        id: e._id,
        successful: e.Delivered,
        read: e.Read,
        sent: e.Sent,
        broadcastName: e.broadCastName,
        Status: e.Status,
        dateTime: moment(e.createdAt).format("YYYY-MM-DD"),
      }));
      setrows(data);
      // console.log(data, "data")
    }
  }, [boradcastHistoryTabelData]);

  // console.log(boradcastHistoryTabelData, 'tabel data')

  return (
    <div>
      <Navbar
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        setNewBroadcastPopup1={setNewBroadcastPopup1}
      />
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
          <div className="">
            <Base2 className="poppins p-3">Overview</Base2>
            <div className="flex flex-wrap pr-3 pl-3">
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={<BiCheck size={"1.3rem"} color={"#5536db"} />}
                  statusText={"Sent"}
                  count={boradcastHistoryStatusData?.Sent}
                />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={
                    <RiCheckDoubleLine size={"1.3rem"} color={"#5536db"} />
                  }
                  statusText={"Delivered"}
                  count={boradcastHistoryStatusData?.Delivered}
                />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={<AiOutlineEye size={"1.3rem"} color={"#5536db"} />}
                  statusText={"Read"}
                  count={boradcastHistoryStatusData?.Read}
                />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={
                    <TbCornerUpLeftDouble size={"1.3rem"} color={"#5536db"} />
                  }
                  statusText={"Replied"}
                  count={0}
                />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={
                    <AiOutlineSend size={"1.3rem"} color={"#5536db"} />
                  }
                  statusText={"Sending"}
                  count={0}
                />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={
                    <MdOutlineSmsFailed size={"1.3rem"} color={"#5536db"} />
                  }
                  statusText={"Failed"}
                  count={boradcastHistoryStatusData?.Failed}
                />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={
                    <HiOutlineArrowPath size={"1.3rem"} color={"#5536db"} />
                  }
                  statusText={"Processing"}
                  count={boradcastHistoryStatusData?.Pending}
                />
              </div>
              <div className="p-2">
                <BrodcastHistoryOverview
                  component={
                    <HiOutlineQueueList size={"1.3rem"} color={"#5536db"} />
                  }
                  statusText={"Queued"}
                  count={0}
                />
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
                  type={"text"}
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
          onClose={() => setNewBroadcastPopup1(!newBroadcastPopup1)}
          className={`${styles.customModal}`}
          setBroadcastHistoryTabelData={setBroadcastHistoryTabelData}
        />
      )}
      {openProfile && (
        <Drawers
          isOpen={openProfile}
          toggleDrawer={!openProfile}
          direction="right"
        >
          <Profile setOpenProfile={setOpenProfile} />
        </Drawers>
      )}
    </div>
  );
};
