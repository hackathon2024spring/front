import React, { FC, useContext, useEffect, useState } from "react";
import { getMonth } from "../Util";
import CalendarHeader from "../components/CalendarHeader";
import Month from "../components/Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "../components/EventModal";

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col bg-[#9debf6] font-roundedMplus">
        <CalendarHeader />
        <WeekDaysLabels />
        {/* Pass the current month index to the Month component */}
        <Month month={currentMonth} currentMonthIndex={monthIndex} />
      </div>
    </>
  );
};

// WeekDaysLabels コンポーネントを作成
const WeekDaysLabels: FC = () => {
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="grid grid-cols-7 text-center border-b font-roundedMplus font-bold">
      {weekDays.map((day, index) => (
        <div
          key={day}
          className={`py-0 ${
            index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-customBrown'
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
