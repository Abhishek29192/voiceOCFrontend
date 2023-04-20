import React from "react";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const TimePickers = ({label, time}) => {
  const [value, setValue] = React.useState(dayjs("2023-02-23T10:30:00"));

  const handleChange = (newValue) => {
    setValue(newValue);
    time(newValue.format("HH:mm"));
  };

  // console.log(value.format("HH:mm"), "valuessss")
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
