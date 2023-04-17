import { PaletteMode } from "@mui/material";
import {
  amber,
  blueGrey,
  deepOrange,
  grey,
  indigo,
  blue,
} from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: blue,
          divider: amber[200],
          background: {
            default: blueGrey[50],
            paper: "#212121",
          },
          text: {
            primary: grey[900],
            secondary: grey[100],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
