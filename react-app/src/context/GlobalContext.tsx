// GlobalContext.tsx
import { createContext } from "react";

interface IGlobalContext {
  handleGlobalClick: () => void;
}

const defaultState: IGlobalContext = {
  handleGlobalClick: () => {},
};

const GlobalContext = createContext<IGlobalContext>(defaultState);

export default GlobalContext;
