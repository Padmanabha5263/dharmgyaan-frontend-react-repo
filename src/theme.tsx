import { createTheme, ThemeOptions } from '@mui/material/styles';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#F0E491',
      contrastText: '#FFF',
      // contrastText: '#31694E',
    },
    secondary: {
      main: '#BBC863',
      contrastText: '#31694E',
    },
    background: {
      default: '#F0E491',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#31694E',
      secondary: '#658C58',
    },
    success: {
      main: '#658C58',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#313647',
      contrastText: '#FFF8D4',
    },
    secondary: {
      main: '#435663',
      contrastText: '#FFF8D4',
    },
    background: {
      default: '#313647',
      paper: '#435663',
    },
    text: {
      primary: '#FFF8D4',
      secondary: '#A3B087',
    },
    success: {
      main: '#A3B087',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
