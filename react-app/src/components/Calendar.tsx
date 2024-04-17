// App.tsx
import { FC } from "react";
import ContextWrapper from "../context/ContextWrapper";
import Month from "../components/Month";

const Calendar: FC = () => {
  return (
    <ContextWrapper>
      <div
        onClick={() => console.log("App clicked")}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Month />
      </div>
    </ContextWrapper>
  );
};

export default Calendar;
