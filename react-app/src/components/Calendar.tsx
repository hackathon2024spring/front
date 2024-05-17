import { FC, useContext, useEffect, useState } from "react";
import { getMonth } from "../Util";
import CalendarHeader from "../components/CalendarHeader";
import Month from "../components/Month";
import GlobalContext from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    if (state?.message) {
      setMessage(state.message);

      // Remove the message from the history state to prevent it from showing on reload
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [state, navigate, location.pathname]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer); // クリーンアップ
    }
  }, [message]);

  return (
    <>
      {message && (
        <div className="flash-message h-16 bg-cyan-100 flex items-center justify-center text-2xl font-roundedMplus font-bold">
          {message}
        </div>
      )}
      <div className="h-screen flex flex-col items-center bg-[#9debf6] font-roundedMplus">
        <CalendarHeader />
        <WeekDaysLabels />
        <Month month={currentMonth} currentMonthIndex={monthIndex} />
      </div>
    </>
  );
};

const WeekDaysLabels: FC = () => {
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="flex justify-center grid grid-cols-7 text-center border-b font-roundedMplus font-bold w-2/3">
      {weekDays.map((day, index) => (
        <div
          key={day}
          className={`py-0 ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-customBrown'
            }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
