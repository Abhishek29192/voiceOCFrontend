import React from "react";
import Select from "react-select";

// const options = [
//   { value: "Old", label: "Oldest" },
//   { value: "Latest", label: "Latest" },
// ];

export const SelectOptionBUtton = ({
  className,
  options,
  placeholder,
  setCurrentlySelectedOption,
}) => {
  const handleChange = (value) => {
    setCurrentlySelectedOption(value.value);
    console.log(value.value, "hgaf");
  };
  return (
    <>
      <Select
        options={options}
        styles={className}
        defaultValue={options[0].value || "Select"}
        autoSize={true}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  );
};
