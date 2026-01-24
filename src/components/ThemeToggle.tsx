import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color: theme.palette.text.primary,
        backgroundColor: "transparent",
        transition: "transform 0.2s ease-in",

        "&:hover": {
          transform: "scale(1.15)",
          backgroundColor: "transparent",
        },
      }}
    >
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
