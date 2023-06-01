import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Styles from "./datePicker.module.css";
import moment from "moment/moment";

export function DatePickers({ label, date, setStartDatePicked, setEndDatePicked, setDatePicked, minDate }) {
  const currentDate = moment(new Date()).format("DD-MM-YYYY");
  const [value, setValue] = React.useState(dayjs('2022-04-17'));


  const handleChange = (newValue) => {
    if (label == "Date picker from") {
      setStartDatePicked(moment(newValue.$d).format("YYYY-MM-DD"))
    } else if (label == "Date picker to") {
      setEndDatePicked(moment(newValue.$d).format("YYYY-MM-DD"))
    }
    if (label == "schedule date") {
      setDatePicked(moment(newValue.$d).format("YYYY-MM-DD"))
    }

  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          inputFormat="DD/MM/YYYY"
          value={date}
          onChange={handleChange}
          className={Styles.demo}
          minDate={minDate}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ label: { paddingLeft: "10px", paddingRight: "10px" } }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
