import { useTranslation } from 'react-i18next';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Language } from '@mui/icons-material';

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        id="language-toggle"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        size="small"
        startIcon={<Language />}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 2,
          padding: '6px 12px',
          minWidth: 'auto',
        }}
      >
        {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-toggle',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === i18n.language}
            sx={{
              fontWeight: lang.code === i18n.language ? 700 : 500,
              backgroundColor: lang.code === i18n.language ? 'action.selected' : 'transparent',
            }}
          >
            {lang.flag} {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageToggle;
