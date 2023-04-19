import React, { useMemo, useState } from "react";
import Chat from "./components/Chat";
import { Box, PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { getDesignTokens } from "./utils/material-ui/customTheme";
import { ConversationContext } from "./context/conversationContext";
import { ConverterProvider } from "./provider/convertsation";

interface ColorModeContextProps {
  toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ConverterProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Chat />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ConverterProvider>
  );
}

export default App;
