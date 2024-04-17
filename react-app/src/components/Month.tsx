import React, { FC } from "react";
import dayjs from "dayjs";
import Day from "./Day";

interface MonthProps {
  month: dayjs.Dayjs[][];
}

const Month: FC<MonthProps> = (props) => {
  const { month } = props;
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
export default Month;
