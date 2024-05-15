import React, { FC } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface DayProps {
  day: dayjs.Dayjs;
  rowIdx: number;
  currentMonthIndex: number; // Add this line
}

const Day: FC<DayProps> = ({ day, currentMonthIndex }) => {
  const navigate = useNavigate();

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

  const handleExerciseClick = () => {
    navigate('/exercise');
  };

  return (
    <div className="border border-borderDivider flex flex-col rounded-none overflow-hidden">
      <header className="bg-customSkyblue p-1 flex justify-center"> {/* Align to center */}
        <p className={dayNumberClasses}>
          {day.format("D")} {/* Remove leading zero for single-digit dates */}
        </p>
      </header>
      <div onClick={handleExerciseClick} className="bg-customSkyblue p-1 flex-1 cursor-pointer p-1">
      </div>
    </div>
  );
};

export default Day;
