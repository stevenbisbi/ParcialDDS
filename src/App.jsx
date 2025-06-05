import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import FindReservation from "./pages/FindReservation";
import ReservationDetail from "./pages/ReservationDetail";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-reservation" element={<FindReservation />} />
          <Route path="/reservation/:id" element={<ReservationDetail />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
