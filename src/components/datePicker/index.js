import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Styles from "./datePicker.module.css";

export function DatePickers({ label, date }) {
  const [value, setValue] = React.useState(dayjs("2023-02-23"));

  const handleChange = (newValue) => {
    setValue(newValue);
    date(newValue.format("DD-MM-YYYY"))
  };

  // console.log(value.format("DD-MM-YYYY"), "date")
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          className={Styles.demo}
          renderInput={(params) => <TextField {...params} sx={{ label: { paddingLeft: '10px', paddingRight: '10px' } }} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
