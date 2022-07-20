import { createTheme } from "@mui/material";

const theme = createTheme();

theme.typography.h1 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.body1 = {
    fontSize: '0.9rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  };
theme.typography.fontFamily =[
        '-apple-system',
        'BlinkMacSystemFont',
        '"Poppins"',
        'sans-serif',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',');

export default theme;