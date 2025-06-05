import { useState } from "react";
import ReservationList from "../reservation/ReservationList";
import useAdminViewModel from "../../viewModels/useAdminViewModel";
import ConfirmationModal from "../ui/ConfirmationModal";

const AdminDashboard = () => {
  const { reservations, loading, error, successMessage, cancelReservation } =
    useAdminViewModel();

  const [reservationToCancel, setReservationToCancel] = useState(null);

  const handleCancelClick = (reservationId) => {
    setReservationToCancel(reservationId);
  };

  const handleConfirmCancel = async () => {
    await cancelReservation(reservationToCancel);
    setReservationToCancel(null);
  };

  return (
    <div className="admin-dashboard">
      <h2>Gestión de Reservas</h2>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservations.length === 0 ? (
        <p>No hay reservas registradas</p>
      ) : (
        <ReservationList
          reservations={reservations}
          onCancel={handleCancelClick}
          showActions={true}
        />
      )}

      {reservationToCancel && (
        <ConfirmationModal
          title="Confirmar Cancelación"
          message="¿Está seguro que desea cancelar esta reserva?"
          onConfirm={handleConfirmCancel}
          onCancel={() => setReservationToCancel(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
