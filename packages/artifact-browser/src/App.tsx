import { useAppSelector } from './hooks/hooks';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes'

import NavigationScroll from './layout/NavigationScroll';

import './App.css';

function App() {
  const customization = useAppSelector((state) => state.customization);
  return (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
            <CssBaseline />
            <NavigationScroll>
                <Routes />
            </NavigationScroll>
        </ThemeProvider>
    </StyledEngineProvider>
);
}

export default App;
