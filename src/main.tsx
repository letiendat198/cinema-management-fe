import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, MantineProvider } from '@mantine/core';
import './index.css'
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css'; //import Mantine V7 styles needed by MRT
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //import MRT styles
import App from './App.tsx'
import Login from './pages/Login.tsx';
import MovieDetails from './pages/MovieDetails.tsx';
import Home from './pages/Home.tsx';
import ManageUser from './pages/manage/ManageUser.tsx';

const theme = createTheme({
    primaryColor: 'blue',
    primaryShade: 6
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="movie/:movieId" element={<MovieDetails/>}/>
            <Route path='/manage'>
              <Route path="/manage/user" element={<ManageUser />}/>
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>  
    </MantineProvider>
    
  </StrictMode>,
)
