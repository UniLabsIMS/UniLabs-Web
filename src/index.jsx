import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Open Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      fontWeight: 700,
    },
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

ReactDOM.render(
  <div>
    <Helmet>
      <Helmet>
        <title>UniLabs</title>
      </Helmet>
    </Helmet>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </div>,
  document.getElementById('root'),
);
reportWebVitals();
