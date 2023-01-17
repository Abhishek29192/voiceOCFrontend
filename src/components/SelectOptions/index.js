import React from "react";
import Select from "react-select";

export const SelectOptionBUtton = ({
  className,
  options,
  placeholder,
  setCurrentlySelectedOption,
}) => {
  const handleChange = (value) => {
    setCurrentlySelectedOption(value.value);
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
