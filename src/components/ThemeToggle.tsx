import { Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 1300, // above everything (MUI dialogs safe)
      }}
    >
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}
