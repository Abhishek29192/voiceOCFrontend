import React, {useEffect, useState} from "react";
import {FaFilter} from "react-icons/fa";
import {IoSearchOutline} from "react-icons/io5";
import {RiDeleteBin5Line} from "react-icons/ri";
import {TfiExport, TfiImport} from "react-icons/tfi";
import {ApprovedButton, PrimaryButton} from "../../components/Button";
import {InputFieldWithoutCounter} from "../../components/InputField";
import Navbar from "../../components/Navbar/index";
import {SelectOptionButton} from "../../components/SelectOptions";
import {optionSort} from "../../constants/DropDownContent";
import {Base2} from "../../components/Typography";
import styles from "./Contact.module.css";
import {AddContactList} from "../../components/Contact/AddContact";
import moment from "moment";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {
  useContactDataToClient,
  useContactDataToServer,
  useDPostExcelToDownload,
} from "../../hooks/useQueryApi";
import {TiTick} from "react-icons/ti";
import {AiOutlineCloudDownload} from "react-icons/ai";
import {HiOutlineEye} from "react-icons/hi";
import BasicTable from "../../components/Table";
import XLSX from "sheetjs-style";
import {useAppCommonDataProvider} from "../../components/AppCommonDataProvider/AppCommonDataProvider";
import {ExcelPopUp} from "./ExcelPopUp";
import {Profile} from "../TeamInbox/Profile";
import {Drawers} from "../../components/Drawer/Drawer";

export const Contacts = () => {
  const [selectedContactListqueryId, setSelectedContactListQueryId] =
    useState(null);
  const [selectedContactExcel, setSelectedContactExcel] = useState([]);
  const [handleContactListModal, sethandleContactListModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [contactDataFromServer, setContactDataFromServer] = useState([]);
  const [viewContacts, setViewContacts] = useState(false);
  const {
    mutate: addContact,
    isSuccess,
    isLoading: Load,
  } = useContactDataToServer();
  const {isLoading, refetch} = useContactDataToClient();
  const {createContactDetails, setCreateContactDetails} =
    useAppCommonDataProvider();
  const {mutateAsync: postExcelData} = useDPostExcelToDownload(
    selectedContactListqueryId
  );

  // useEffect(() => {
  //   postExcelData().then((res) => setSelectedContactExcel(res?.data?.contacts)).catch((err) => console.log(err))
  // }, [selectedContactExcel])

  const handleSubmitFile = () => {
    console.log("download");
    const formData = new FormData();
    formData.append("name", selectedFile);
    formData.append("UserId", "one");
    addContact(formData);
    sethandleContactListModal(false);
  };

  const handleDownload = (entry) => {
    const data = {
      UserId: "one",
      ExcelId: entry.ContactList._id,
    };

    setSelectedContactListQueryId(entry.ContactList._id);

    postExcelData(data)
      .then((res) => {
        console.log(res, "downloadghnbjhnb");
        const workSheet = XLSX?.utils?.json_to_sheet(res?.data?.contactList);
        const workBook = XLSX?.utils?.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "contacts");

        XLSX.write(workBook, {bookType: "xlsx", type: "buffer"});

        XLSX.write(workBook, {bookType: "xlsx", type: "binary"});

        XLSX.writeFile(workBook, "./" + res?.data?.filename);
      })
      .catch((err) => console.log(err));
  };

  const handleViewExcel = (entry) => {
    console.log(entry, "entryyyyyyyyy");
    setViewContacts(true);
    const data = {
      UserId: "one",
      ExcelId: entry?.ContactList._id,
    };
    setSelectedContactListQueryId(entry.ContactList._id);
    postExcelData(data)
      .then((res) => setSelectedContactExcel(res?.data))
      .catch((err) => console.log(err));
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
        basicInfo: entry?.ContactList.fileName,
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
          .format("YYYY-MM-DD"),
        broadcast: <TiTick size={"1.5rem"} style={{margin: "auto"}} />,
        action: (
          <div className="flex  justify-center">
            <div className="mx-3">
              <AiOutlineCloudDownload
                size={"1.5rem"}
                style={{margin: "auto"}}
                onClick={() => handleDownload(entry)}
              />
            </div>
            <div>
              <HiOutlineEye
                size={"1.5rem"}
                style={{margin: "auto"}}
                onClick={() => handleViewExcel(entry)}
              />
            </div>
          </div>
        ),
      }));

    setTableData(rows);
    setCreateContactDetails?.({
      basicInfo: contactDataFromServer?.map(
        (entry) => entry?.ContactList?.fileName
      ),
    });
    return rows;
  }

  const headCells = [
    {
      id: "basicInfo",
      numeric: false,
      disablePadding: false,
      label: "Basic Info",
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
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Actions",
      align: "center",
      headerAlign: "center",
    },
  ];

  function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
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
              <TableSortLabel
                active={orderBy === headCell.id}
                // sx={{ border: "1px solid red", alignItems: "left" }}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <b>{headCell.label}</b>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
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

  const handleUploadedFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div>
        <Navbar openProfile={openProfile} setOpenProfile={setOpenProfile} />
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
                      className={colourStyles}
                      options={optionSort}
                    />
                  </div>
                  <div className={styles.input__container}>
                    <InputFieldWithoutCounter
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
          </div>
          <div>
            {isLoading || Load ? (
              <h2 className="poppins flex justify-center items-center">
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
          <AddContactList
            isOpen={handleContactListModal}
            onClose={() => {
              sethandleContactListModal(false);
            }}
            className="rounded-xl"
            onChange={(e) => handleUploadedFile(e)}
            fileName={fileName}
            handleSubmitFile={handleSubmitFile}
          />
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
