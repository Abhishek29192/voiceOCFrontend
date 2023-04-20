import * as React from "react";
import {DataGrid} from "@mui/x-data-grid";

export default function ContactTable({
  rows,
  columns,
  rowHeight,
  onSelectionModelChange,
  checkboxSelection,
}) {
  return (
    <div style={{height: 400, width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={checkboxSelection}
        rowHeight={rowHeight}
        // onSelectionModelChange={(ids) => {
        //   // console.log(ids, "---");
        //   // const selectedIDs = new Set(ids);
        //   // console.log(selectedIDs, "---");
        //   const selectedRowData = rows.filter((row) => {
        //     return row.id == ids[0];
        //   });
        //   console.log(selectedRowData);
        //   setSelectedTabelRow(selectedRowData);
        // }}
        onSelectionModelChange={onSelectionModelChange}
      />
    </div>
  );
}
