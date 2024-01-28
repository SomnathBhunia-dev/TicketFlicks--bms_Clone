import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import SeatingChart from "./Components/SeatingChart";
import SingleMovies from './Components/SingleMovies';
import Navbar from './Components/Navbar';
import SlotPage from './Components/SlotPage';
import Context from './Components/Context';
import CheckOut from './Components/CheckOut';
import Booking from './Components/Booking';
import TrailerShow from './Components/TrailerShow';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Context>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies/:keyword' element={<SingleMovies />} />
            <Route path='/booktickets/:movie' element={<SeatingChart />} />
            <Route path='/slotPick' element={<SlotPage />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/Bookings' element={<Booking />} />
            <Route path='/TrailerPage/:keyword' element={<TrailerShow />} />
          </Routes>
        </Router>
        <Footer />
      </Context>
    </>
  );
}

export default App;
