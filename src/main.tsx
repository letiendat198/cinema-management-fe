import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, MantineProvider } from '@mantine/core';
import './index.css'
import '@mantine/carousel/styles.css';
import App from './App.tsx'
import Login from './pages/Login.tsx';

const theme = createTheme({
    primaryColor: 'blue',
    primaryShade: 6
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>  
    </MantineProvider>
    
  </StrictMode>,
)
