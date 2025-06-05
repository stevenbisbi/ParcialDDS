import ReservationForm from "../components/reservation/ReservationForm";
import { useState } from "react";

const HomePage = () => {
  const handleReservationSuccess = (reservation) => {
    setConfirmationData({
      message: `Reserva confirmada para ${reservation.date} a las ${reservation.time}`,
      id: reservation.id,
    });
    setShowConfirmation(true);
  };

  return (
    <main className="container">
      <h1>Reserva tu Mesa</h1>
      <ReservationForm onReservationCreated={handleReservationSuccess} />
    </main>
  );
};

export default HomePage;
