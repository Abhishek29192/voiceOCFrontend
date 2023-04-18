import React from "react";
import Select from "react-select";

export const SelectOptionButton = ({
  className,
  options,
  placeholder,
  // setCurrentlySelectedOption,
  value,
  selectedValue,
  onChange,
}) => {
  // console.log(selectedValue, "valuee");
  // const handleChange = (value) => {
  //   setCurrentlySelectedOption(value.value);
  // };
  return (
    <div className="w-full">
      <Select
        options={options}
        styles={className}
        defaultValue={selectedValue || "Select"}
        autoSize={true}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
