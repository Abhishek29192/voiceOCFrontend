import React, { useState } from "react";
import BroadcastOptions from "../../../components/BroadcastOptions";
import { PrimaryButton } from "../../../components/Button";
import Navbar from "../../../components/Navbar";
import { Base2 } from "../../../components/Typography";
import styles from "./BroadcastHistory.module.css";
import { NewBroadCast } from "./NewBroadCast";
import { DatePickers } from "../../../components/datePicker/index";
import { SelectOptionButton } from "../../../components/SelectOptions";
import { dateSortOption, optionSort } from "../../../constants/DropDownContent";
import { BrodcastHistoryOverview } from "../../../components/BroadcastHistoryOverview/BrodcastHistoryOverview";
import { IoSearchOutline } from "react-icons/io5";
import { InputFieldWithoutCounter } from "../../../components/InputField";
import ContactTable from "../../../components/Table/contactTable";
import { RiCheckDoubleLine } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { AiOutlineEye, AiOutlineSend } from "react-icons/ai";
import { TbCornerUpLeftDouble } from "react-icons/tb";
import { MdOutlineSmsFailed } from "react-icons/md";
import { HiOutlineArrowPath, HiOutlineQueueList } from "react-icons/hi2";
import {
  useBroadcastDataHistoryOveraAllStatus,
  useBroadcastHistoryTabelData,
  useSortDateRangeFilter,
} from "../../../hooks/useQueryApi";
import { BsBarChart } from "react-icons/bs";
import { useEffect } from "react";
import moment from "moment/moment";
import { Drawers } from "../../../components/Drawer/Drawer";
import { Profile } from "../../TeamInbox/Profile";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./common.css";
import SingleBroadcastStatus from "./SingleBroadcastStatus";
import Styles from "../BroadcastHistory/BroadcastHistory.module.css";

export const BroadcastHistory = () => {
  const [rows, setrows] = useState([]);
  const [rowSortedTabelData, setRowSortedTabelData] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [boradcastHistoryTabelData, setBroadcastHistoryTabelData] = useState(
    []
  );
  const [newTableData, setNewTableData] = useState([]);
  const [boradcastHistoryStatusData, setBroadcastHistoryStatusData] =
    useState();
  const [serachTextEntered, setSearchTextEntered] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [newBroadcastPopup1, setNewBroadcastPopup1] = useState(false);
  const [showSortedOveralldata, setShowSortedOveralldata] = useState(false);
  const [sortedData, setSortedData] = useState(null);
  const [showSingleBroadcastStatus, setShowSingleBroadcastStatus] =
    useState(false);
  const [singleRowData, setSingleRowData] = useState(null);
  const [startDatePicked, setStartDatePicked] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDatePicked, setEndDatePicked] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const { refetch } = useBroadcastHistoryTabelData();
  const { refetch: getAllStatus, isFetching } =
    useBroadcastDataHistoryOveraAllStatus();
  const { mutateAsync } = useSortDateRangeFilter();

  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        width: "14.5rem",
        height: "3.4rem",
        boxShadow: "none",
        fontSize: "12px",
        fontFamily: "poppins",
        marginTop: "2px",
        // border: "1px solid #5536db",
        "&:active": {
          border: "1px solid #5536db",
        },
      };
    },
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "#000",
        width: "8rem",
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

  const handleSelectedValue = (e) => {
    setShowSortedOveralldata(true);
    setSelectedPeriod(e);
    let dateTo;
    let dateFrom;
    if (e.label === "7 Days ago") {
      dateTo = moment(new Date()).format("YYYY-MM-DD");
      dateFrom = moment().subtract(7, "d").format("YYYY-MM-DD");
      setEndDatePicked(moment(new Date()).format("YYYY-MM-DD"));
      setStartDatePicked(moment().subtract(7, "d").format("YYYY-MM-DD"));
    } else if (e.label === "30 Days ago") {
      dateTo = moment(new Date()).format("YYYY-MM-DD");
      dateFrom = moment().subtract(30, "d").format("YYYY-MM-DD");
      setEndDatePicked(moment(new Date()).format("YYYY-MM-DD"));
      setStartDatePicked(moment().subtract(30, "d").format("YYYY-MM-DD"));
    } else {
      setEndDatePicked(moment(new Date()).format("YYYY-MM-DD"));
      setStartDatePicked(moment(new Date()).format("YYYY-MM-DD"));
      dateTo = moment(new Date()).format("YYYY-MM-DD");
      dateFrom = moment(new Date("1995-12-17T03:24:00")).format("YYYY-MM-DD");
      setShowSortedOveralldata(false);
    }

    mutateAsync({ dateTo: dateTo, dateFrom: dateFrom })
      .then((res) => {
        setBroadcastHistoryStatusData(res?.data?.overrallData);
        setBroadcastHistoryTabelData(res?.data?.allBroadCastData);
      })
      .catch((err) => console.log(err, "err"));
  };

  const handleSortBy = (ele) => {
    setSortBy(ele);
    let temp = [...boradcastHistoryTabelData];
    if (ele.value == "Latest") {
      setNewTableData(
        temp.sort(
          (a, b) =>
            new Date(moment(b.createdAt).format("YYYY-MM-DD")) -
            new Date(moment(a.createdAt).format("YYYY-MM-DD"))
        )
      );
    } else {
      setNewTableData(
        temp.sort(
          (a, b) =>
            new Date(moment(a.createdAt).format("YYYY-MM-DD")) -
            new Date(moment(b.createdAt).format("YYYY-MM-DD"))
        )
      );
    }
    setBroadcastHistoryTabelData([...temp]);
  };

  const handelSearchText = (text) => {
    setSearchTextEntered(text);
    if (text.length != 0) {
      let a = boradcastHistoryTabelData.filter((t) =>
        t.broadCastName.toLowerCase().includes(text.toLowerCase())
      );
      setBroadcastHistoryTabelData(a);
    } else {
      setBroadcastHistoryTabelData(newTableData);
    }
  };

  useEffect(() => {
    refetch()
      .then((res) => {
        setBroadcastHistoryTabelData(res?.data?.data);
        setNewTableData(res?.data?.data);
      })
      .catch((err) => console.log(err));

    getAllStatus()
      .then((res) => setBroadcastHistoryStatusData(res?.data?.data))
      .catch((err) => console.log(err, "err"));
  }, []);

  console.log(singleRowData, "71821426115122");
  useEffect(() => {
    if (boradcastHistoryTabelData) {
      let data = boradcastHistoryTabelData?.map((e, index) => ({
        id: e._id,
        successful: e.Delivered,
        read: e.Read,
        sent: e.Sent,
        replied: e.Reply,
        broadcastName: e.broadCastName,
        recipient: e.Sent,
        Status: e.Status,
        Scheduled: e.Scheduled,
        contactCount: e.contactCount,
        dateTime: moment(e.createdAt).format("DD-MM-YYYY"),
        failed: e.Failed,
      }));
      setrows(data);

      // if (showSingleBroadcastStatus) {
      //   console.log(data, "data selected")
      // }
    }
  }, [
    boradcastHistoryTabelData,
    showSortedOveralldata,
    showSingleBroadcastStatus,
  ]);
  console.log(boradcastHistoryTabelData, "aaaaaaaaaaaaaaaa");
  console.log(showSingleBroadcastStatus, "statys");

  const columns = [
    {
      field: "dateTime",
      renderHeader: (params) => <p className="text-lg font-bold ml-5">Date</p>,
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "broadcastName",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Broadcast name Scheduled</p>
      ),
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "successful",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Successful</p>
      ),
      renderCell: (params) => {
        return (
          <div className="h-[50%] w-[50%]">
            <CircularProgressbar
              // background={#5536db}
              styles={buildStyles({ pathColor: "#5536db", textColor: "black" })}
              className="font-[#5536db]"
              value={(params.row.successful / params.row.contactCount) * 100}
              text={`${Math.floor(
                (params.row.successful / params.row.contactCount) * 100
              )}%`}
              strokeWidth={10}
            />
          </div>
        );
      },
      width: 160,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "read",
      renderHeader: (params) => <p className="text-lg font-bold ml-5">Read</p>,
      renderCell: (params) => {
        return (
          <div className="h-[50%] w-[50%]">
            <CircularProgressbar
              // background={#5536db}
              styles={buildStyles({ pathColor: "#5536db", textColor: "black" })}
              className="font-[#5536db]"
              value={(params.row.read / params.row.contactCount) * 100}
              text={`${Math.floor(
                (params.row.read / params.row.contactCount) * 100
              )}%`}
              strokeWidth={10}
            />
          </div>
        );
      },
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "replied",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Replied</p>
      ),
      renderCell: (params) => {
        return (
          <div className="h-[50%] w-[50%]">
            <CircularProgressbar
              // background={#5536db}
              styles={buildStyles({ pathColor: "#5536db", textColor: "black" })}
              className="font-[#5536db]"
              value={(params.row.replied / params.row.contactCount) * 100}
              text={`${Math.floor(
                (params.row.replied / params.row.contactCount) * 100
              )}%`}
              strokeWidth={10}
            />
          </div>
        );
      },
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "recipients",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Recipient</p>
      ),
      renderCell: (params) => {
        {
          return <div>{`${params.row.sent}/${params.row.contactCount}`}</div>;
        }
      },
      width: 110,
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
      width: 140,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "actions",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Actions</p>
      ),
      align: "center",
      width: 110,
      editable: true,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex">
            <div
              className="border-[1px] p-1 rounded mx-3"
              onClick={() => {
                setShowSingleBroadcastStatus(!showSingleBroadcastStatus);
                setSingleRowData(params.row);
              }}
            >
              <BsBarChart size={"1.4rem"} />
            </div>
            {/* <div className="border-[1px] p-1 rounded ">
              <AiOutlineEye size={"1.5rem"} />
            </div> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        setNewBroadcastPopup1={setNewBroadcastPopup1}
        activeTab={localStorage.getItem("activeTab")}
      />
      <div className="flex">
        <BroadcastOptions
          activeMenuOption={localStorage.getItem("activeMenuOption")}
        />
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
                <DatePickers
                  label={"Date picker from"}
                  date={startDatePicked}
                  setStartDatePicked={setStartDatePicked}
                />
              </div>
              <div className="w-1/3 m-2">
                <DatePickers
                  label={"Date picker to"}
                  date={endDatePicked}
                  setEndDatePicked={setEndDatePicked}
                />
              </div>
              <div className="h-17 w-1/3 p-[0.34rem] justify-center items-center">
                <SelectOptionButton
                  value={selectedPeriod}
                  className={colourStyles}
                  options={dateSortOption}
                  onChange={(e) => handleSelectedValue(e)}
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
                  count={boradcastHistoryStatusData?.Replied}
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
                  statusText={"Scheduled"}
                  count={boradcastHistoryStatusData?.Scheduled}
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
                    value={sortBy}
                    className={colourStyles1}
                    options={optionSort}
                    onChange={(e) => handleSortBy(e)}
                  />
                </div>
              </div>
              <div className={`${styles.input__container} w-[70%] ml-7`}>
                <InputFieldWithoutCounter
                  type={"text"}
                  placeholder="Search ..."
                  className={"h-10"}
                  onChange={(e) => handelSearchText(e.target.value)}
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
                rowSelection={false}
                columns={columns}
                rowHeight={140}
                disableColumnMenu={true}
                disableRowSelector={true}
                sortable={false}
                disableSelectionOnClick={true}
              />
            </div>
          </div>
        </div>
      </div>
      {showSingleBroadcastStatus && (
        <SingleBroadcastStatus
          isOpen={showSingleBroadcastStatus}
          onClose={() => {
            setShowSingleBroadcastStatus(false);
          }}
          className={`${Styles.customModalSingleBroadcastStatus}`}
          classes={"height:'70vh'"}
          singleRowData={singleRowData}
        />
      )}
      {newBroadcastPopup1 && (
        <NewBroadCast
          isOpen={newBroadcastPopup1}
          onClose={() => setNewBroadcastPopup1(!newBroadcastPopup1)}
          className={`${styles.customModal}`}
          setBroadcastHistoryTabelData={setBroadcastHistoryTabelData}
          setNewBroadcastPopup1={setNewBroadcastPopup1}
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
