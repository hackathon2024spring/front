import { FC, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Month: FC = () => {
  const { handleGlobalClick } = useContext(GlobalContext);

  return <button onClick={handleGlobalClick}>Click me!</button>;
};

export default Month;
