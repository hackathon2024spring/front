import dayjs from "dayjs";
import { createContext } from "react";

interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  daySelected: dayjs.Dayjs | null;
  setDaySelected: (day: dayjs.Dayjs) => void;
  showEventModal: boolean;
  setShowEventModal: (isShow: boolean) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  monthIndex: 0,
  setMonthIndex: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
});

export default GlobalContext;

// import { createContext } from "react";

// interface IGlobalContext {
//   handleGlobalClick: () => void;
// }

// const GlobalContext = createContext<IGlobalContext>({
//   handleGlobalClick: () => {},
// });

// export default GlobalContext;
