import React from "react";
import cn from "classnames";
import Button from "../components/Button";

function InstallExtension() {
  return (
    <div className={cn("pt-[77px] pb-[66px] w-[961px] m-auto")}>
      <h3 className={cn("text-[20px] mb-[24px]")}>Get Extension Now</h3>
      <div
        className={cn(
          "pt-[57px] p-x-[145px] pb-[48px]",
          "text-[16px] text-center",
          "border-[0.5px] border-solid border-[#E5E5E5]"
        )}>
        <p className="text-[#2867BB] w-[670px] text-center m-auto mb-[24px]">
          Get warned about phishers on the web:
        </p>
        <Button
          label="Install the Web Extension (coming soon!)"
          active={false}
          className="rounded-[100px] text-[16px] text-[#0D1320]"
        />
        <p className={cn("text-center text-[16px] text-[#666F85] my-[24px]")}>
          Users of{" "}
          <a className="text-[#2867BB]" href="https://metamask.io/flask">
            MetaMask Flask
          </a>
          :
        </p>
        <a href="https://montoya.github.io/get-mobymask-snap/">
          <Button
            className=" rounded-[100px] bg-gradient-to-r from-[#334FB8] to-[#1D81BE] text-white inline-block m-auto"
            label=" Install the MetaMask Snap"
          />
        </a>
      </div>
    </div>
  );
}

export default InstallExtension;
