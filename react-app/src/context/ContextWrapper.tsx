// ContextWrapper.tsx
import { useState, ReactNode, FC } from "react";
import GlobalContext from "./GlobalContext";

interface Props {
  children: ReactNode;
}

const ContextWrapper: FC<Props> = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleGlobalClick = () => {
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 2000); // モーダルを2秒後に非表示
  };

  return (
    <GlobalContext.Provider value={{ handleGlobalClick }}>
      {children}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          clicked!
        </div>
      )}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
