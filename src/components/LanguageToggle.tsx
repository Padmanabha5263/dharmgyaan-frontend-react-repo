import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../ThemeContext";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const languages = [
    { code: "en", langName: "english", name: "English" },
    { code: "hi", langName: "hindi", name: "हिंदी" },
    { code: "kn", langName: "kannada", name: "ಕನ್ನಡ" },
    { code: "bn", langName: "bangla", name: "বাংলা" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <Box>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="small"
        sx={{
          textTransform: "uppercase",
          fontWeight: 600,
          color: theme.palette.text.primary,
          backgroundColor: "transparent",
          border: "none",
          transition: "transform 0.2s ease-in",

          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: "transparent",
          },
        }}
      >
        {currentLanguage?.langName}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 2,
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === i18n.language}
            onClick={() => {
              i18n.changeLanguage(lang.code);
              setAnchorEl(null);
            }}
            sx={{
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageToggle;
