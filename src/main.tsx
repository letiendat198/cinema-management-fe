import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-datatable/styles.css';
import { Notifications } from '@mantine/notifications';
import App from './App';

const theme = createTheme({
    primaryColor: 'blue',
    primaryShade: 6
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position='top-right' zIndex={1000} autoClose={3000} />
        <App />
    </MantineProvider>
  </StrictMode>,
)
