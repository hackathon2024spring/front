import dayjs from "dayjs";
import { useState, ReactNode, FC } from "react";
import GlobalContext from "./GlobalContext";

interface Props {
  children: ReactNode;
}

const ContextWrapper: FC<Props> = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
