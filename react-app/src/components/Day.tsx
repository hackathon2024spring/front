import { FC, useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Hanamaru from '../../public/hanamaru.svg';
import GlobalContext, { CalendarEvent } from "../context/GlobalContext";

interface DayProps {
  day: dayjs.Dayjs;
  rowIdx: number;
  currentMonthIndex: number;
}

const Day: FC<DayProps> = ({ day, currentMonthIndex }) => {
  const navigate = useNavigate();
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const { savedEvents } = useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(evt =>
      dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const isCurrentMonth = day.month() === currentMonthIndex;
  const nonCurrentMonthClass = isCurrentMonth ? "" : "opacity-20";

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "text-white bg-buttonNormal rounded-full w-7 h-7 flex items-center justify-center"
      : "";
  };

  const dayClasses = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    ? "bg-[#FFCC4D] rounded-full text-center"
    : day.day() === 6
      ? "text-blue-500"
      : day.day() === 0
        ? "text-red-500"
        : "text-customBrown";

  const dayNumberClasses = `text-lg font-bold my-1 ${getCurrentDayClass()} ${dayClasses} ${nonCurrentMonthClass}`;

  // 花丸を表示する条件を定義
  const showHanamaru = [15, 17, 18].includes(day.date());

  const handleExerciseClick = () => {
    navigate('/exercise');
  };

  return (
    <div className="border border-borderDivider flex flex-col rounded-none overflow-hidden">
      <header className="bg-customSkyblue p-1 flex justify-center">
        <p className={dayNumberClasses}>
          {day.format("D")}
        </p>
      </header>
      <div
        onClick={handleExerciseClick}
        className="bg-customSkyblue p-1 flex-1 cursor-pointer flex flex-col items-center justify-center relative"
      >
        {showHanamaru && <img src={Hanamaru} alt="花丸" className="absolute bottom-0 mb-0 w-20 h-20" />}
      </div>

      {/* イベントリスト サンプル*/}
      <ul className="p-2">
        {dayEvents.map((event, index) => (
          <li key={index} className="text-sm py-1">
            {event.title}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Day;
