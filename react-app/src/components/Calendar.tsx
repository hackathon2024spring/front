import { FC, useContext, useEffect, useState } from "react";
import { getMonth } from "../Util";
import CalendarHeader from "../components/CalendarHeader";
import Month from "../components/Month";
import GlobalContext from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";

const Calendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedMonthIndex = localStorage.getItem('monthIndex');
    if (savedMonthIndex !== null) {
      setMonthIndex(parseInt(savedMonthIndex, 10));
    }
  }, [setMonthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    if (state?.message) {
      setMessage(state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [state, navigate, location.pathname]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        localStorage.setItem('monthIndex', monthIndex.toString());
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, monthIndex]);

  return (
    <>
      {message && (
        <div className="flash-message h-16 bg-cyan-100 flex items-center justify-center text-2xl font-roundedMplus font-bold">
          {message}
        </div>
      )}
      <div className="h-full flex flex-col items-center bg-[#9debf6] font-roundedMplus"> {/* Apply background color here */}
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
    <div className="flex justify-center grid grid-cols-7 text-center border-b bg-[#9debf6] font-roundedMplus font-bold w-2/3 mt-0 pt-4">
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
