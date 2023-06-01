import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function ContactTable({
  rows,
  columns,
  rowHeight,
  onSelectionModelChange,
  checkboxSelection,
  rowSelection,
  disableColumnMenu,
  disableRowSelector,
  disableSelectionOnClick,
}) {


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={checkboxSelection}
        rowHeight={rowHeight}
        rowSelection={rowSelection}
        onSelectionModelChange={onSelectionModelChange}
        disableColumnMenu={disableColumnMenu}
        disableRowSelector={disableRowSelector}
        disableSelectionOnClick={disableSelectionOnClick}
      />
    </div>
  );
}
