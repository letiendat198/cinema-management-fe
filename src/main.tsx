import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, MantineProvider } from '@mantine/core';
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-datatable/styles.css';
import App from './App.tsx'
import Login from './pages/Login.tsx';
import MovieDetails from './pages/MovieDetails.tsx';
import Home from './pages/Home.tsx';
import ManageUser from './pages/manage/manage-user/ManageUser.tsx';
import { Notifications } from '@mantine/notifications';
import ManageMovie from './pages/manage/manage-movie/ManageMovie.tsx';
import ManageCinemaGeneral from './pages/manage/manage-cinema/ManageCinemaGeneral.tsx';
import ManageSchedule from './pages/manage/manage-schedule/ManageSchedule.tsx';

const theme = createTheme({
    primaryColor: 'blue',
    primaryShade: 6
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position='top-right' zIndex={1000} autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="movie/:movieId" element={<MovieDetails/>}/>
            <Route path='/manage'>
              <Route path="/manage/user" element={<ManageUser />}/>
              <Route path="/manage/movie" element={<ManageMovie />}/>
              <Route path="/manage/cinema" element={<ManageCinemaGeneral />} />
              <Route path="/manage/schedule" element={<ManageSchedule />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>  
    </MantineProvider>
    
  </StrictMode>,
)
