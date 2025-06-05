import { useState } from "react";
import ReservationForm from "../components/reservation/ReservationForm";
import ConfirmationModal from "../components/ui/ConfirmationModal";

const HomePage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationInfo, setConfirmationInfo] = useState(null);

  const handleReservationSuccess = (reservation) => {
    setConfirmationInfo({
      message: `Reserva confirmada para ${reservation.date} a las ${reservation.time}`,
      id: reservation.id,
    });
    setShowConfirmation(true);
  };

  return (
    <main className="container mt-4">
      <h1 className="mb-4 text-center">Reserva tu Mesa</h1>
      <ReservationForm onReservationCreated={handleReservationSuccess} />

      {showConfirmation && confirmationInfo && (
        <ConfirmationModal
          title="Reserva creada"
          message={confirmationInfo.message}
          reservationId={confirmationInfo.id}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </main>
  );
};

export default HomePage;
