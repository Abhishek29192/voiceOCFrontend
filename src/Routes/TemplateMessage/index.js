import React, { useEffect, useState } from "react";
import {
  Base1Strong,
  Base2,
  Paragraph1,
  Paragraph3,
} from "../../components/Typography";
import { optionSort } from "../../constants/DropDownContent";
import { ApprovedButton, PrimaryButton } from "../../components/Button";
import { IoSearchOutline } from "react-icons/io5";
import { InputFieldWithoutCounter } from "../../components/InputField";
import { SelectOptionButton } from "../../components/SelectOptions";
import { FaFilter } from "react-icons/fa";
import { TfiImport, TfiExport } from "react-icons/tfi";
import { RxCopy } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import BroadcastOptions from "../../components/BroadcastOptions";
import BasicTable from "../../components/Table";
import CustomModal from "../../components/Modal";
import newTemplateBlue from "../../components/Images/newTemplateBlue.svg";
import templateOption from "../../components/Images/storedTemplate.svg";
import styles from "./TemplateMessage.module.css";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useTemplateData } from "../../hooks/useQueryApi";
import { CreateTemplatePopup } from "../../components/CreateTemplatePopup";
import { useAppCommonDataProvider } from "../../components/AppCommonDataProvider/AppCommonDataProvider";
import moment from "moment";
import { Drawers } from "../../components/Drawer/Drawer";
import { Profile } from "../TeamInbox/Profile";

export const TemplateMessage = () => {
  const { isLoading, refetch } = useTemplateData();
  const [templateData, setTemplateData] = useState(null);
  const { setCreateTemplateValues, setSelectedRowData } =
    useAppCommonDataProvider();
  const [open, setOpen] = useState(false);
  const [createTemplate, setCreateNewTemplate] = useState(false);
  const [viewTemplate, setViewTemplate] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [serachText, setSearchText] = useState("")
  const [templateSortData, setTemplateSortData] = useState([])
  const [tableDataSort, setTableDataSort] = useState([])
  const [sortBy, setSortBy] = useState([])
  const [newTableData, setNewTableData] = useState([])

  useEffect(() => {
    refetch().then((res) => {
      if (res.isError === false) createData(res.data?.data);
      setTemplateData(res?.data?.data);
      setTemplateSortData(res?.data?.data)
      setNewTableData(res?.data?.data)
    });
  }, []);


  const handleSortBy = (ele) => {
    setSortBy(ele)
    console.log(ele, "elelelel")
    if (ele.value == "Latest") {
      setNewTableData(tableData.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)))
    } else {
      setNewTableData(tableData.sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated)))
    }
  }

  const handleSearch = (e) => {
    if (e.length != 0) {
      let a = tableData.filter((t) => {
        return t.templateName?.toLowerCase().includes(e.toLowerCase())
      }
      );
      setTableData(a)
    } else {
      setTableData(tableDataSort)
    }
  }

  const handleNewTemplate = () => {
    setOpen(!open);
  };

  const handleCreateNewTemplate = () => {
    setCreateNewTemplate(!createTemplate);
    // setOpen(!open);
  };

  function createData(data) {
    const rows =
      data &&
      data?.map((entry, index) => ({
        templateName: entry?.template_name,
        category: entry?.Category,
        status: entry?.status ? (
          <ApprovedButton
            text={entry.status}
            className="text-sm font-semibold"
          />
        ) : (
          <ApprovedButton
            text={entry.status}
            className="text-sm font-semibold"
          />
        ),
        language: entry?.Langauge,
        lastUpdated: moment(`${entry.updatedAt}`).utc().format("YYYY-MM-DD"),
        templateType: entry?.Type,
        action: (
          <div className="flex justify-center">
            <div
              className={`${styles.template_btn}`}
              onClick={() => {
                setTimeout(() => {
                  setViewTemplate(true);
                }, 200);
                setCreateTemplateValues({
                  templateName: entry?.template_name,
                  category: entry?.Category,
                  mediaType: entry?.MediaType,
                  language: entry?.Language,
                  header: entry?.headerOption,
                  body: entry?.Body,
                  templateType: entry?.Type,
                  footer: entry?.Footer,
                  optionalButtonValue: entry?.ButtonType,
                  ctaButtons: entry?.Buttons,
                  ctaButtonLabels: entry?.Buttons.map((e) => e.typeOfAction),
                  footer: entry?.Footer,
                });
                setSelectedRowData?.(entry);
              }}
            >
              <HiOutlineEye size={"1.2rem"} />
            </div>
            {/* <div className={`ml-4  ${styles.template_btn}`}>
              <HiOutlineEye size={"1.2rem"} />
            </div>
            <div className="ml-4">
              <RiDeleteBin5Line size={"1.2rem"} />
            </div> */}
          </div>
        ),
      }));
    setTableData(rows);
    setTableDataSort(rows)
    return rows;
  }

  const headCells = [
    {
      id: "templateName",
      numeric: false,
      disablePadding: false,
      label: "Template Name",
    },
    {
      id: "category",
      numeric: true,
      disablePadding: false,
      label: "Category",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "language",
      numeric: true,
      disablePadding: false,
      label: "Language",
    },
    {
      id: "lastUpdated",
      numeric: true,
      disablePadding: false,
      label: "Last Updated",
    },
    {
      id: "templateType",
      numeric: false,
      disablePadding: false,
      label: "Template type",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
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
                active={orderBy === headCell.id}
                // sx={{ border: "1px solid red", alignItems: "left" }}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              > */}
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
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
        width: "12rem",
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
    <>
      <div className="">


        <Navbar openProfile={openProfile} setOpenProfile={setOpenProfile} activeTab={localStorage.getItem("activeTab")} />
        <div className=" xl:flex ">
          {/* <div className=""> */}
          <BroadcastOptions activeMenuOption={localStorage.getItem("activeMenuOption")} />
          {/* </div> */}
          <div className={styles.Brodcast_section}>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <Base2 className={styles.sort__text}>Sorted By :</Base2>
                <div className="h-12 ml-2 ">
                  <SelectOptionButton
                    value={sortBy}
                    className={colourStyles}
                    options={optionSort}
                    onChange={(e) => handleSortBy(e)}
                  />
                </div>
                <div className={styles.input__container}>
                  <InputFieldWithoutCounter
                    type={"text"}
                    placeholder="Search..."
                    className={"h-11"}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <IoSearchOutline
                    className="absolute top-[0.65rem] right-2"
                    size={"1.6rem"}
                  />
                </div>
                {/* <button className={styles.filter__icon}>
                  <FaFilter
                    size={"1.2rem"}
                    color={"white"}
                    className={styles.filter}
                  />
                </button> */}
                {/* <div className={styles.import_export_icon}>
                  <div className={styles.import_border}>
                    <TfiImport />
                  </div>
                  <div className="p-3">
                    <TfiExport />
                  </div>
                </div> */}
              </div>
              <PrimaryButton
                text="Update Template"
                onClick={handleNewTemplate}
              />
            </div>
            <div className="mt-8">
              {isLoading ? (
                <h2 className="poppins justify-center items-center">
                  Loading...
                </h2>
              ) : (
                <BasicTable
                  tableContent="templateMessage"
                  // rows={createData(data?.data)}
                  rows={tableData}
                  EnhancedTableHead={EnhancedTableHead}
                />
              )}
            </div>
          </div>
        </div>

        {open && (
          <CustomModal
            open={open}
            onClose={() => setOpen(false)}
            showCloseIcon={true}
          >
            <div>
              <div>
                <Base1Strong className="mr-96">Create New Template</Base1Strong>
              </div>
              <div className="flex">
                <div
                  className={styles.template_section1}
                // onClick={handleCreateNewTemplate}
                >
                  <img
                    src={newTemplateBlue}
                    className={styles.template__images}
                  />
                  <Paragraph1>Start From Scratch</Paragraph1>
                  <Paragraph3 className="pt-3 poppins pb-3">
                    Start from a blank template
                  </Paragraph3>
                </div>
                <div className={styles.template_section1}>
                  <img
                    src={templateOption}
                    className={styles.template__images}
                  />
                  <Paragraph1>Use A Template</Paragraph1>
                  <Paragraph3 className="pt-3 poppins">
                    Use one of our pre-defined templates and edit them
                  </Paragraph3>
                </div>
              </div>
            </div>
          </CustomModal>
        )}


        {viewTemplate && (
          <CreateTemplatePopup
            isOpen={viewTemplate}
            onClose={() => setViewTemplate(false)}
            className={`${styles.customModal}`}
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
    </>
  );
};
