import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  mode: "",
  setMode: () => {},
});

export default function useThemeContext() {
  return useContext(ThemeContext);
}

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
