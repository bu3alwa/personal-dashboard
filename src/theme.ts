import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#32383D',
    },
    secondary: {
      main: '#4C555C',
    },
    error: {
      main: red.A400,
    },
    warning: {
        main: '#ed6c02',
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#32383D"
        }
      }
    },
    MuiIcon: {
      styleOverrides: {
        
      }
    }
  }
});

export default theme;