import React, { FC } from "react";
import dayjs from "dayjs";
import Day from "./Day";

interface MonthProps {
  month: dayjs.Dayjs[][];
  currentMonthIndex: number; // Add this line
}

const Month: FC<MonthProps> = ({ month, currentMonthIndex }) => {
  return (
    <div className="flex-1 grid grid-cols-7 gap-1.5 p-1.5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            // Pass the current month index to the Day component
            <Day day={day} key={idx} rowIdx={i} currentMonthIndex={currentMonthIndex} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;