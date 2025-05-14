import { BrowserRouter, Route, Routes } from "react-router";
import MovieDetails from './pages/MovieDetails.tsx';
import Home from './pages/Home.tsx';
import ManageUser from './pages/manage/manage-user/ManageUser.tsx';
import ManageMovie from './pages/manage/manage-movie/ManageMovie.tsx';
import ManageCinemaGeneral from './pages/manage/manage-cinema/ManageCinemaGeneral.tsx';
import ManageSchedule from './pages/manage/manage-schedule/ManageSchedule.tsx';
import ManageItem from './pages/manage/manage-item/ManageItem.tsx';
import UserProfile from './pages/UserProfile.tsx';
import VerifyPayment from './pages/VerifyPayment.tsx';
import UserTicket from './pages/UserTicket.tsx';
import DefaultLayout from "./layout/DefaultLayout.tsx";
import Statistic from "./pages/Statistic.tsx";

// import './debugCSS.css'

function App() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDetails/>} />
            <Route path='/my-ticket' element={<UserTicket/>} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/verify-payment' element={<VerifyPayment />} />
            <Route path="/manage">
              <Route path="/manage/cinema" element={<ManageCinemaGeneral />} />
              <Route path="/manage/user" element={<ManageUser />}/>
              <Route path="/manage/movie" element={<ManageMovie />}/>
              <Route path="/manage/schedule" element={<ManageSchedule />} />
              <Route path='/manage/item' element={<ManageItem />} />
            </Route>  
          </Route>
        </Routes>
      </BrowserRouter>  
    )
}

export default App
