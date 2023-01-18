import cn from "classnames";
import MuiButton from "@mui/material/Button";

function Button(props = {}) {
  const { label = "button", active = false, className = "", ...other } = props;

  return (
    <MuiButton
      className={cn(
        "w-[max-content] px-[16px] py-[12px] inline-block text-[16px] ",
        "border-[0.5px] border-solid rounded-[10px]",
        "cursor-pointer",
        active
          ? "text-[#2867BB] bg-[rgb(40,103,187)]/[0.1] border-[rgb(40,103,187)]/[0.1]"
          : "text-[#101828] border-[#D0D5DD] ",
        className
      )}
      {...other}>
      {label}
    </MuiButton>
  );
}

export default Button;
