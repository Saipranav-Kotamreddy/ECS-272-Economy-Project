import React from "react";

const ChoosePeriod = ({ setPeriod }) => {
  // Define the fixed options
  const options = ['1810', "1840", "1870", "1900"];

  // Handle the selection change
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setPeriod(selectedValue); // Update the state using the passed function
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option: </label>
      <select id="dropdown" onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChoosePeriod;
