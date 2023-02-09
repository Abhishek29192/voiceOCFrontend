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
import {
  useContactDataToClient,
  useContactDataToServer,
} from "../../hooks/useQueryApi";
import { TiTick } from "react-icons/ti";
import BasicTable from "../../components/Table";
import { CheckBox } from "@mui/icons-material";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";

export const Contacts = () => {
  const { mutate: addContact } = useContactDataToServer();

  const { isLoading, refetch } = useContactDataToClient();

  const { createContactDetails, setCreateContactDetails } =
    useAppCommonDataProvider();

  const [handleContactListModal, sethandleContactListModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    refetch().then((res) => {
      if (res.isError === false) {
        createData(res.data.data.contactList);
      }
    });
  }, []);

  function createData(data) {
    const rows = data?.map((entry) => ({
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
      broadcast: <TiTick size={"1.5rem"} />,
      sms: <TiTick size={"1.5rem"} />,
    }));

    setTableData(rows);
    setCreateContactDetails?.({
      basicInfo: data?.map((entry) => entry.ContactList.fileName),
    });
    // console.log(rows);
    // const rows = data.data.contactList?.map((entry, index) => ({
    //   templateName: entry.template_name,
    //   category: entry.Category,
    //   status: entry.status ? <ApprovedButton /> : null,
    //   language: entry.Langauge,
    //   lastUpdated: moment(`${entry.updatedAt}`).utc().format("YYYY-MM-DD"),
    //   action: (
    //     <div className="flex">
    //       <div
    //         className={`${styles.template_btn}`}
    //         onClick={() => {
    //           setTimeout(() => {
    //           console.log(entry);
    //             <p>jhm</p>;
    //             // setViewTemplate(true);
    //           }, 200);
    //           setCreateTemplateValues({
    //             templateName: entry?.template_name,
    //             category: entry?.Category,
    //             language: entry?.Language,
    //             header: entry?.headerOption,
    //             body: entry?.Body,
    //             footer: entry?.Footer,
    //             optionalButtonValue: entry?.ButtonType,
    //             ctaButtons: entry?.Buttons,
    //             ctaButtonLabels: entry?.Buttons.map((e) => e.typeOfAction),
    //             footer: entry?.Footer,
    //           });
    //           setSelectedRowData?.(entry);
    //         }}>
    //       </div>
    //     </div>
    //   ),
    // }));
    return rows;
  }

  const headCells = [
    {
      id: "basicInfo",
      numeric: false,
      disablePadding: false,
      label: "Basic Info",
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
    },
    {
      id: "broadcast",
      numeric: true,
      disablePadding: false,
      label: "Broadcast",
    },
    {
      id: "sms",
      numeric: true,
      disablePadding: false,
      label: "SMS",
    },
    // {
    //   id: "action",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Edit/Delete",
    // },
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
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                // sx={{ border: "1px solid red", alignItems: "left" }}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}>
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
    // setIsFilePicked(true);
  };

  const handleSubmitFile = () => {
    const formData = new FormData();

    formData.append("name", selectedFile);
    formData.append("UserId", "one");
    addContact(formData);
  };
  if (isLoading) return <p>Loading...</p>;
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
          {isLoading ? (
            <h2 className="poppins justify-center items-center">Loading...</h2>
          ) : (
            <BasicTable
              tableContent="ContactData"
              rows={tableData}
              EnhancedTableHead={EnhancedTableHead}
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
  );
};
