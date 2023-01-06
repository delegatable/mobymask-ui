import React, { useRef, useState } from "react";
import { reportTypes as options } from "../constants";
import cn from "classnames";

function ReportInput() {
  const [selectedOption, setSelectedOption] = useState("TWT");
  const inputRef = useRef(null);

  function submitFrom() {
    const info = sanitizeValue(selectedOption, inputRef.current.value);
    console.log(info);
  }

  return (
    <>
      <div className="flex justify-center">
        {options.map((item) => (
          <div
            className={cn(
              "mx-1 cursor-pointer",
              "px-[17.5px] pt-[8.5px] pb-[6.5px]",
              "rounded-t-[10px] border-[0.5px] border-[#D0D5DD] border-solid",
              `text-[${selectedOption === item.value ? "white" : "#D0D5DD"}]`,
              `bg-[${selectedOption === item.value ? "black" : "white"}]`
            )}
            key={item.value}
            onClick={() => setSelectedOption(item.value)}>
            {item.label}
          </div>
        ))}
      </div>
      <div className="relative w-max m-auto rounded-[100px] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <input
          ref={inputRef}
          className={cn(
            "w-[910px] h-[80px] m-auto text-[18px] px-[35px]",
            "border-[0.5px] border-solid border-[#D0D5DD] rounded-[100px]"
          )}
          placeholder="Enter a twitter name to check if it is a phisher..."
        />
        <span
          className="absolute top-[30px] right-9 cursor-pointer"
          onClick={submitFrom}>
          🔍
        </span>
      </div>
    </>
  );
  // return (
  //   // <form onSubmit={handleSubmit}>
  //   //   <div>
  //   //     <label htmlFor="report-type">Report Type:</label>
  //   //     <select id="report-type" name="report-type" onChange={handleChange}>
  //   //       {options.map((option) => (
  //   //         <option key={option.value} value={option.value}>
  //   //           {option.label}
  //   //         </option>
  //   //       ))}
  //   //     </select>
  //   //   </div>
  //   //   <div>
  //   //     <label htmlFor="value">Value:</label>
  //   //     <input
  //   //       type="text"
  //   //       id="value"
  //   //       name="value"
  //   //       value={value}
  //   //       onChange={(event) => setValue(event.target.value)}
  //   //     />
  //   //   </div>
  //   //   <div>
  //   //     <button type="submit">Submit</button>
  //   //   </div>
  //   // </form>
  // );
}

function sanitizeValue(type, value) {
  switch (type) {
    case "TWT":
      value = value.indexOf("@") === 0 ? value.slice(1) : value;
      break;

    case "URL":
      value = value.indexOf("//") === -1 ? value : value.split("//")[1];
      break;

    case "eip155:1":
      value = value.indexOf("0x") === 0 ? value : `0x${value}`;
      value = value.toLowerCase();
      break;
  }

  return `${type}:${value}`;
}

export default React.memo(ReportInput);
