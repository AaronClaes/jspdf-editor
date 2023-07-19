import { touchRippleClasses } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#02040a",
      paper: "#12161c",
    },
    text: {
      primary: "#e6edf3",
      secondary: "rgba(230,237,243,0.7)",
      disabled: "rgba(230,237,243,0.7)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          [`& .${touchRippleClasses.root} .${touchRippleClasses.child}`]: {
            borderRadius: 8,
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
