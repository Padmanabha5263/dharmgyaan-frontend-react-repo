import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../ThemeContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

export default function UserPreferences() {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1300,

        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 0.5,
        borderRadius: 2,

        backgroundColor: isDarkMode
          ? theme.palette.background.paper
          : theme.palette.background.default,

        boxShadow: theme.shadows[4],
        transition: "background-color 0.3s ease-in",
      }}
    >
      <LanguageToggle />
      <ThemeToggle />
    </Box>
  );
}
