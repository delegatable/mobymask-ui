import { useId } from "react";
import cn from "classnames";
function TableList(props) {
  const { tableHeader = [], tabList = [] } = props;
  const key = useId();
  return (
    <div className={cn("pb-[50px]")}>
      {" "}
      <div
        className={cn(
          `grid`,
          "text-center text-[#666F85] text-[14px] leading-[24px] py-[8px]",
          "border-b-[0.5px] border-solid border-[#E5E5E5]"
        )}
        style={{
          gridTemplateColumns: `repeat(${tableHeader.length}, minmax(0, 1fr))`,
        }}>
        {tableHeader.map((item, index) => (
          <div key={`${key}Table${index}`}>{item.title}</div>
        ))}
      </div>
      {tabList.length > 0 ? (
        tabList.map((phisher, num) => (
          <div
            key={"storedPhishersli" + num}
            className={cn(
              "py-[18px] text-center",
              `grid`,
              "border-b-[0.5px] border-solid border-[#E5E5E5]"
            )}
            style={{
              gridTemplateColumns: `repeat(${tableHeader.length}, minmax(0, 1fr))`,
            }}>
            {tableHeader.map((item, index) => (
              <div
                key={`${key}${index}`}
                className={cn("flex justify-center items-center")}>
                {!item.render ? phisher[item.key] : item.render(phisher)}
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-center py-[40px]">no report phisher</div>
      )}
      {tabList.length > 0 ? (
        <p
          className={cn(
            "text-[16px] text-[#D0D5DD] text-center line-[24px] mt-[16px]"
          )}>
          in the end···
        </p>
      ) : null}
    </div>
  );
}

export default TableList;
