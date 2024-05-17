import { createContext } from "react";

export interface DayEvent {
  day: string;
  exerciseDone: boolean;
}

interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  dayEvents: DayEvent[] | null;
  setDayEvents: (events: DayEvent[]) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  monthIndex: 0,
  setMonthIndex: () => { },
  dayEvents: null,
  setDayEvents: () => { },
});

export default GlobalContext;
