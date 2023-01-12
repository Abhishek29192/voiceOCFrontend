import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoMdCopy } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function createData(name, calories, fat, carbs, protein, icon1, icon2, icon3) {
  return { name, calories, fat, carbs, protein, icon1, icon2, icon3 };
}

const rows = [
  createData(
    "Frozen yoghurt",
    159,
    6.0,
    24,
    4.0,
    <IoMdCopy size={"1.3rem"} />,
    <AiOutlineEye size={"1.3rem"} />,
    <RiDeleteBin6Line size={"1.3rem"} />
  ),
  createData(
    "Ice cream sandwich",
    237,
    9.0,
    37,
    4.3,
    <IoMdCopy size={"1.3rem"} />,
    <AiOutlineEye size={"1.3rem"} />,
    <RiDeleteBin6Line size={"1.3rem"} />
  ),
  createData(
    "Eclair",
    262,
    16.0,
    24,
    6.0,
    <IoMdCopy size={"1.3rem"} />,
    <AiOutlineEye size={"1.3rem"} />,
    <RiDeleteBin6Line size={"1.3rem"} />
  ),
  createData(
    "Cupcake",
    305,
    3.7,
    67,
    4.3,
    <IoMdCopy size={"1.3rem"} />,
    <AiOutlineEye size={"1.3rem"} />,
    <RiDeleteBin6Line size={"1.3rem"} />
  ),
  createData(
    "Gingerbread",
    356,
    16.0,
    49,
    3.9,
    <IoMdCopy size={"1.3rem"} />,
    <AiOutlineEye size={"1.3rem"} />,
    <RiDeleteBin6Line size={"1.3rem"} />
  ),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Template Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Language</TableCell>
            <TableCell align="center">Last Updated</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell
                align="left"
                sx={{
                  display: "flex",
                  // flexDirection: "row-reverse",
                  marginLeft: "10px",
                  justifyContent: "space-evenly",
                }}
              >
                {row.icon1}
                {row.icon2}
                {row.icon3}
              </TableCell>
              {/* <TableCell align="right">{row.icon2}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
