import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Styles from "./datePicker.module.css";
import { style } from "@mui/system";

export function DatePickers({ label }) {
  console.log(label, "label");
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          className={Styles.demo}
          renderInput={(params) => <TextField {...params} sx={{label:{paddingLeft:'10px',paddingRight:'10px'}}}/>}
        />
      </Stack>
    </LocalizationProvider>
  );
}
