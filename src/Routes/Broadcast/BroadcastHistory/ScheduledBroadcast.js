import React, { useState } from "react";
import moment from "moment/moment";
import { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import BroadcastOptions from "../../../components/BroadcastOptions";
import { PrimaryButton } from "../../../components/Button";
import { Drawers } from "../../../components/Drawer/Drawer";
import { InputFieldWithoutCounter } from "../../../components/InputField";
import Navbar from "../../../components/Navbar";
import ContactTable from "../../../components/Table/contactTable";
import { Base2 } from "../../../components/Typography";
import { useSchedulBroadcastData } from "../../../hooks/useQueryApi";
import { Profile } from "../../TeamInbox/Profile";
import { NewBroadCast } from "./NewBroadCast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BroadcastHistory.module.css";

export const ScheduledBroadcast = () => {
  let rowss = [];
  const { refetch } = useSchedulBroadcastData();
  const [scheduleBroadcastdata, setScheduleBroadcastData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [newBroadcastPopup1, setNewBroadcastPopup1] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [rowData, setRowData] = useState([])

  const handleSearchInput = (e) => {
    setSearchText(e)
    if (e.length != 0) {
      let a = tableRows.filter((t) =>
        t.broadcastName.toLowerCase().includes(e.toLowerCase())
      );
      setTableRows(a)
    } else {
      setTableRows(rowData)
    }
  }

  const columns = [
    {
      field: "broadcastName",
      renderHeader: (params) => (
        <p className="text-lg font-bold">Broadcast name</p>
      ),
      width: 300,
      editable: true,
      // align: "center",
      // headerAlign: "center",
    },
    {
      field: "scheduleDate",
      renderHeader: (params) => (
        <p className="text-lg font-bold ml-5">Scheduled</p>
      ),
      width: 300,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "scheduleTime",
      renderHeader: (params) => <p className="text-lg font-bold ml-7">Time</p>,
      type: "number",
      width: 250,
      editable: true,
    },
  ];

  useEffect(() => {
    refetch()
      .then((res) => {
        setScheduleBroadcastData(res?.data.data);
      })
      .catch((error) => console.log(error, "erroeeee"));
  }, [scheduleBroadcastdata]);


  useEffect(() => {
    let rowss = scheduleBroadcastdata?.map((e, index) => ({
      id: index,
      broadcastName: e.broadCastName,
      scheduleDate: `Start In  :  ${moment(new Date(e.date)).format("DD-MM-YYYY")}`,
      scheduleTime: e.time,
    }));
    setTableRows(rowss);
    setRowData(rowss)
  }, [scheduleBroadcastdata]);

  return (
    <div>
      <Navbar openProfile={openProfile} setOpenProfile={setOpenProfile} activeTab={localStorage.getItem("activeTab")} />
      <div className="flex">
        <BroadcastOptions activeMenuOption={localStorage.getItem("activeMenuOption")} />
        <div className={styles.Brodcast_section}>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center">
              <Base2 className={styles.sort__text}>Scheduled Broadcast</Base2>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className={styles.input__container}>
              <InputFieldWithoutCounter
                type={"text"}
                placeholder="Search ..."
                className={"h-11 w-60"}
                onChange={(e) => handleSearchInput(e.target.value)}
              />
              <IoSearchOutline
                className="absolute top-[0.65rem] right-2"
                size={"1.6rem"}
              />
            </div>
            <PrimaryButton
              text={"New Broadcast"}
              onClick={() => setNewBroadcastPopup1(true)}
            />
          </div>
          <div className="mt-12 bg-white">
            <ContactTable
              tableContent="broadcastData"
              rows={tableRows}
              columns={columns}
              rowHeight={100}
              disableSelectionOnClick={true}
            // checkboxSelection={"none"}
            // onSelectionModelChange={onSelectionModelChange}
            />
          </div>
        </div>
      </div>
      {newBroadcastPopup1 && (
        <NewBroadCast
          isOpen={newBroadcastPopup1}
          onClose={() => setNewBroadcastPopup1(!newBroadcastPopup1)}
          className={`${styles.customModal}`}
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
