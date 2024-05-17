import dayjs from "dayjs";
import { useState, ReactNode, FC, useEffect, useRef } from "react";
import GlobalContext, { DayEvent } from "./GlobalContext";
import { BaseURL } from "../utilities/base_url";


interface Props {
  children: ReactNode;
}

interface FetchData {
  status: number;
  data: DayEvent[];
}


const ContextWrapper: FC<Props> = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [dayEvents, setDayEvents] = useState<DayEvent[] | null>(null);
  const prevMonthIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevMonthIndexRef.current !== monthIndex) {
      const currentYearAndMonth = dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY M');
      const year = currentYearAndMonth.split(' ')[0];
      const month = currentYearAndMonth.split(' ')[1];
      const fetchDayEvents = async () => {
        try {
          const response = await fetch(`${BaseURL()}/calendars/${year}/${month}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const fetchData: FetchData = await response.json();
          if (fetchData.status == 1) {
            setDayEvents(fetchData.data);
          } else {
            console.error('Error fetching data:', fetchData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchDayEvents()
      console.log(monthIndex)
    }
    prevMonthIndexRef.current = monthIndex;
  }, [monthIndex]);

  useEffect(() => {
    console.log(dayEvents)
  }, [dayEvents]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        dayEvents,
        setDayEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
