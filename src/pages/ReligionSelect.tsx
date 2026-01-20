import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Card, CardActionArea, CardContent, Container, Typography, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../ThemeContext";
import { Religion, useReligion } from "../features/religion";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function ReligionSelect() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const religion = useReligion({ initialLoad: true });

  const handleSelect = (religion: Religion) => {
    navigate("/quiz", { state: religion });
  };

  return (
    <Box
      sx={{
        minHeight: '200px',
        display: 'grid',
        bgcolor: 'background.default',
        py: 2,
        px: 2,
        gap: 2,
        width: { xs: '100%', sm: 400, md: 600 },
        mx: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <LanguageSwitcher />
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <h1>{t('common.selectReligion')}</h1>
      <p>{t('common.chooseReligion')}</p>
      {
        religion.data.length && religion.data.map((religion, index) => {
          return (
            <Card key={religion.religion_id}>
              <CardActionArea
                onClick={() => handleSelect(religion)}
                data-active={true}
                sx={{
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >
                <CardContent sx={{ height: '100%' }}>
                  <Typography variant="h5" component="div">
                    {religion.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {religion.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      }
    </Box>
  );
}