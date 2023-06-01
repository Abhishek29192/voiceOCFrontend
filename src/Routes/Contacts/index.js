import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { ApprovedButton, PrimaryButton } from "../../components/Button";
import { InputFieldWithoutCounter } from "../../components/InputField";
import Navbar from "../../components/Navbar/index";
import { SelectOptionButton } from "../../components/SelectOptions";
import { optionSort } from "../../constants/DropDownContent";
import { Base2 } from "../../components/Typography";
import styles from "./Contact.module.css";
import { AddContactList } from "../../components/Contact/AddContact";
import moment from "moment";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useContactDataToClient,
  useContactDataToServer,
  useDPostExcelToDownload,
  useDeleteContactExcel,
} from "../../hooks/useQueryApi";
import { TiTick } from "react-icons/ti";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { HiOutlineEye } from "react-icons/hi";
import BasicTable from "../../components/Table";
import XLSX from "sheetjs-style";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";
import { ExcelPopUp } from "./ExcelPopUp";
import { Profile } from "../TeamInbox/Profile";
import { Drawers } from "../../components/Drawer/Drawer";

export const Contacts = () => {
  const [selectedContactListqueryId, setSelectedContactListQueryId] =
    useState(null);
  const [selectedContactExcel, setSelectedContactExcel] = useState();
  const [handleContactListModal, sethandleContactListModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [newTableData, setNewTableData] = useState([]);
  const [contactDataFromServer, setContactDataFromServer] = useState([]);
  const [viewContacts, setViewContacts] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [serachTextEntered, setSearchTextEntered] = useState("");
  const [contactListName, setContactListName] = useState("");

  const {
    mutate: addContact,
    isSuccess,
    isLoading: Load,
  } = useContactDataToServer();
  const { isLoading, refetch } = useContactDataToClient();
  const { createContactDetails, setCreateContactDetails } =
    useAppCommonDataProvider();
  const { mutateAsync: postExcelData } = useDPostExcelToDownload(
    selectedContactListqueryId
  );
  const { mutateAsync: deleteExcel } = useDeleteContactExcel();

  const handelSearchText = (text) => {
    setSearchTextEntered(text);
    console.log(text, "textnn");
    if (text.length != 0) {
      let a = tableData.filter((t) =>
        t.basicInfo.toLowerCase().includes(text.toLowerCase())
      );
      setTableData(a);
    } else {
      // console.log("No basic info")
      setTableData(newTableData);
    }
  };

  const handleSubmitFile = () => {
    if (selectedFile && contactListName) {
      const formData = new FormData();
      formData.append("name", selectedFile);
      formData.append("UserId", "one");
      formData.append("contactListName", contactListName);
      addContact(formData);
      sethandleContactListModal(false);
      setContactListName("");
      setSelectedFile(null);
      setFileName("");
    } else {
      toast.error(`Name and Excel file should not be empty`, {
        autoClose: 1500,
        closeOnClick: true,
        position: "top-right",
      });
      setContactListName("");
      setSelectedFile(null);
      setFileName("");
    }
  };

  const handleDownload = (entry) => {
    const data = {
      UserId: "one",
      ExcelId: entry.ContactList._id,
    };

    setSelectedContactListQueryId(entry.ContactList._id);

    postExcelData(data)
      .then((res) => {
        const workSheet = XLSX?.utils?.json_to_sheet(res?.data?.contactList);
        const workBook = XLSX?.utils?.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "contacts");

        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

        XLSX.writeFile(workBook, "./" + res?.data?.filename);
      })
      .catch((err) => console.log(err));
  };

  const hanSampleFile = () => {
    console.log("clicked");
    fetch("http://3.6.197.151:3057/sample.xls")
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sample.xls";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  const handleViewExcel = async (entry) => {
    const data = {
      UserId: "one",
      ExcelId: entry?.ContactList._id,
    };
    setSelectedContactListQueryId(entry.ContactList._id);
    let result = await postExcelData(data);
    setSelectedContactExcel(result.data);

    setViewContacts(true);
  };

  const handleDeleteExcel = (entry) => {
    // console.log(entry, "trhgfythhtfgjgdf")
    if (window.confirm("Are you sure you want to delete")) {
      const data = {
        UserId: "one",
        id: entry.ContactList._id,
      };
      deleteExcel(data)
        .then((res) => setContactDataFromServer(res?.data?.contactList))
        .catch((err) => console.log(err, "error"));
    }
  };

  const handleSortBy = (ele) => {
    setSortBy(ele);
    if (ele.value == "Latest") {
      tableData.sort(
        (a, b) =>
          new Date(b.createdDate.split("-").reverse().join("-")) -
          new Date(a.createdDate.split("-").reverse().join("-"))
      );
    } else {
      tableData.sort(
        (a, b) =>
          new Date(a.createdDate.split("-").reverse().join("-")) -
          new Date(b.createdDate.split("-").reverse().join("-"))
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch()
        .then((res) => {
          setContactDataFromServer(res?.data?.data?.contactList);
          createData(res?.data?.data?.contactList);
        })
        .catch((err) => console.log(err));
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch()
      .then((res) => {
        setContactDataFromServer(res?.data?.data?.contactList);
        createData(res?.data?.data?.contactList);
      })
      .catch((err) => console.log(err));
  }, [contactDataFromServer, handleContactListModal]);

  function createData(data) {
    const rows =
      data &&
      data?.map((entry) => ({
        contactListName: entry?.ContactList?.contactListName,
        basicInfo: entry?.ContactList?.fileName,
        customAttributes: entry?.ContactList.customAttributes.map((e) => {
          return (
            <ApprovedButton
              text={`${e}`}
              className="flex text-xs m-2 font-semibold border"
            />
          );
        }),
        createdDate: moment(`${entry?.ContactList.createdAt}`)
          .utc()
          .format("DD-MM-YYYY"),
        broadcast: <TiTick size={"1.5rem"} style={{ margin: "auto" }} />,
        action: (
          <div className="flex  justify-center">
            <div className="mx-3">
              <AiOutlineCloudDownload
                size={"1.5rem"}
                style={{ margin: "auto" }}
                onClick={() => handleDownload(entry)}
              />
            </div>
            <div>
              <HiOutlineEye
                size={"1.5rem"}
                style={{ margin: "auto" }}
                onClick={() => handleViewExcel(entry)}
              />
            </div>

            <div className={styles.delete__icon}>
              <RiDeleteBin5Line
                size={"1.2rem"}
                color={"red"}
                className="absolute"
                onClick={() => handleDeleteExcel(entry)}
              />
            </div>
          </div>
        ),
      }));
    setTableData(rows);
    setNewTableData(rows);
    setCreateContactDetails?.({
      basicInfo: contactDataFromServer?.map(
        (entry) => entry?.ContactList?.fileName
      ),
    });
    return rows;
  }

  const headCells = [
    {
      id: "contactListName",
      numeric: false,
      disablePadding: false,
      label: "Contact List Name",
      headerAlign: "center",
    },
    {
      id: "basicInfo",
      numeric: false,
      disablePadding: false,
      label: "File Name",
      headerAlign: "center",
    },
    {
      id: "customAttributes",
      numeric: true,
      disablePadding: false,
      label: "Custom Attributes",
    },
    {
      id: "createdDate",
      numeric: true,
      disablePadding: false,
      label: "Created Date",
      width: "100px",
      align: "center",
      headerAlign: "center",
    },
    {
      id: "broadcast",
      numeric: true,
      disablePadding: false,
      label: "Broadcast",
      align: "center",
      headerAlign: "center",
      disableSort: false,
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Actions",
      align: "center",
      headerAlign: "center",
      disableSort: false,
    },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <CheckBox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              // onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell> */}
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {/* <TableSortLabel
                active={orderBy !== headCell.id}
                // sx={{ border: "1px solid red", alignItems: "left" }}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              > */}
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
              {/* </TableSortLabel> */}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

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

  const handleUploadedFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div>
        <Navbar openProfile={openProfile} setOpenProfile={setOpenProfile} activeTab={localStorage.getItem("activeTab")} />
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
              <PrimaryButton
                text={"+ Add Contact List"}
                onClick={() => {
                  sethandleContactListModal(true);
                }}
              />
            </div>
          </div>
          <div className={styles.background__color}>
            <div className={styles.Brodcast_section}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Base2 className={styles.sort__text}>Sorted By :</Base2>
                  <div className="h-12 ml-3 ">
                    <SelectOptionButton
                      value={sortBy}
                      className={colourStyles}
                      options={optionSort}
                      onChange={(e) => handleSortBy(e)}
                    />
                  </div>
                  <div className={styles.input__container}>
                    <InputFieldWithoutCounter
                      placeholder="Search ..."
                      className={"h-10 mt-1"}
                      onChange={(e) => handelSearchText(e.target.value)}
                    />
                    <IoSearchOutline
                      className="absolute top-3 right-0"
                      size={"1.6rem"}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <a
                    className={styles.ationbar__downloadlink}
                    onClick={() => hanSampleFile()}
                  >
                    Download sample Excel
                  </a>
                  {/* <div className={styles.import_export_icon}>
                    <div className={styles.import_border}>
                      <TfiImport />
                    </div>
                    <div className="p-3">
                      <TfiExport />
                    </div>
                  </div> */}
                  {/* <div className="flex ml-5">
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
                  </div> */}
                  {/* <div className={styles.delete__icon}>
                    <RiDeleteBin5Line
                      size={"1.2rem"}
                      color={"red"}
                      className="absolute"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div>
            {isLoading || Load ? (
              <h2 className="poppins flex justify-center items-center w-full h-full">
                Loading...
              </h2>
            ) : (
              <BasicTable
                tableContent="ContactData"
                rows={tableData}
                EnhancedTableHead={EnhancedTableHead}
                getRowId={(rows) => rows._id}
              />
            )}
          </div>
        </div>

        {handleContactListModal && (
          <>
            <AddContactList
              isOpen={handleContactListModal}
              onClose={() => {
                sethandleContactListModal(false);
              }}
              className="rounded-xl"
              onChange={(e) => handleUploadedFile(e)}
              fileName={fileName}
              handleSubmitFile={handleSubmitFile}
              setContactListName={setContactListName}
            />
            <ToastContainer theme="light" />
          </>
        )}
      </div>
      {viewContacts && (
        <ExcelPopUp
          isOpen={viewContacts}
          onClose={() => setViewContacts(false)}
          className={`${styles.customModal}`}
          selectedContactExcel={selectedContactExcel}
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
    </>
  );
};
