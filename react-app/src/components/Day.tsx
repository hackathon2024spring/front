import React, { FC, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext, { CalendarEvent } from "../context/GlobalContext";

interface DayProps {
  day: dayjs.Dayjs;
  rowIdx: number;
  currentMonthIndex: number; // Add this line
}

const Day: FC<DayProps> = ({ day, rowIdx, currentMonthIndex }) => {
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } = useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(evt =>
      dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const isCurrentMonth = day.month() === currentMonthIndex;

  // Add a new class for non-current month days
  const nonCurrentMonthClass = isCurrentMonth ? "" : "opacity-20";

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "text-white bg-buttonNormal rounded-full w-7 h-7 flex items-center justify-center"
      : "";
  };

  const dayClasses = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    ? "bg-[#FFCC4D] rounded-full text-center" //  今日の日付に丸印を入れる
    : day.day() === 6 // 土曜日の場合
    ? "text-blue-500"
    : day.day() === 0 // 日曜日の場合
    ? "text-red-500"
    : "text-customBrown";

  const dayNumberClasses = `text-lg font-bold my-1 ${getCurrentDayClass()} ${dayClasses} ${nonCurrentMonthClass}`;

  return (
    <div className={`border border-borderDivider flex flex-col rounded-none overflow-hidden`}>
      <header className="bg-customSkyblue p-1 flex justify-center"> {/* Align to center */}
        <p className={dayNumberClasses}>
          {day.format("D")} {/* Remove leading zero for single-digit dates */}
        </p>
      </header>
      <div
        className="bg-customSkyblue p-1 flex-1 cursor-pointer p-1"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className="bg-neutral-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate"
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;