import dayjs from "dayjs";
import { createContext, Dispatch } from "react";

// イベントを表す型定義
export interface CalendarEvent {
  title: string;
  day: number; // dayjs.Dayjs.valueOf() から取得するタイムスタンプ
  id: number;
}

// イベントアクションを扱うための型
interface EventAction {
  type: string;
  payload: CalendarEvent;
}

interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  daySelected: dayjs.Dayjs | null;
  setDaySelected: (day: dayjs.Dayjs) => void;
  showEventModal: boolean;
  setShowEventModal: (isShow: boolean) => void;
  dispatchCalEvent: Dispatch<EventAction>;
  savedEvents: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  monthIndex: 0,
  setMonthIndex: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: () => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
});

export default GlobalContext;
