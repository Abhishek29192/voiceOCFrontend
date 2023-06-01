import React from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

export const SelectOptionButton = ({
  className,
  options,
  placeholder,
  value,
  selectedValue,
  onChange,
  autofocus,
  onKeyDown,
  components,
  isSearchable

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
        defaultValue={selectedValue || "Select" || value}
        autoSize={true}
        placeholder={placeholder}
        onChange={onChange}
        // autoFocus={autofocus}
        onKeyDown={onKeyDown}
        components={components}
        isSearchable={isSearchable}
      />
    </div>
  );
};
