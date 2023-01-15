import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#00AB66', 
    },
    secondary: {
      main: '#2fd09a',
    },
    error: {
      main: red.A400,
    },
    background: {
      //default: "#a2b897"
      default: "#b6c7ad"
    }
  },
});

export default theme;