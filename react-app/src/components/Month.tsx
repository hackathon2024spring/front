import React, { FC, useContext } from "react";
import dayjs from "dayjs";
import Day from "./Day";
import GlobalContext from "../context/GlobalContext";

interface MonthProps {
  month: dayjs.Dayjs[][];
  currentMonthIndex: number;
}

const Month: FC<MonthProps> = ({ month, currentMonthIndex }) => {
  const { dayEvents } = useContext(GlobalContext);

  const getExerciseDoneForDay = (day: dayjs.Dayjs): boolean => {
    if (dayEvents) {
      const dateString = day.format("YYYY-MM-DD");
      const event = dayEvents.find((event) => event.day === dateString);
      return event ? event.exerciseDone : false;
    } else {
      return false;
    }
  };

  return (
    <div className="flex-1 grid grid-cols-7 gap-1.5 p-1.5 w-2/3 mb-12">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            // Pass the current month index to the Day component
            <Day day={day} key={idx} rowIdx={i} currentMonthIndex={currentMonthIndex} exerciseDone={getExerciseDoneForDay(day)} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
