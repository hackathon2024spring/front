import dayjs from "dayjs";
import { useState, ReactNode, FC, useReducer, useEffect } from "react";
import GlobalContext, { CalendarEvent } from "./GlobalContext";

interface Props {
  children: ReactNode;
}
const saveEventsReducer = (
  state: CalendarEvent[],
  action: { type: string; payload: CalendarEvent }
) => {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    // 他のアクションタイプに対する処理もここに追加できます
    default:
      return state;
  }
};

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

const ContextWrapper: FC<Props> = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [savedEvents, dispatchCalEvent] = useReducer(
    saveEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    // 以下構文でlocalStorageに保存
    // localStorage.setItem('key', 'value')
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
