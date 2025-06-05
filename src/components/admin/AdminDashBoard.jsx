import { useState } from "react";
import ReservationList from "../reservation/ReservationList";
import useAdminViewModel from "../../viewModels/useAdminViewModel";
import CancelModal from "../ui/CancelModal";

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
    <div className="container mt-5">
      <h2 className="mb-4">Gestión de Reservas</h2>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

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
        <CancelModal
          title="Cancelar reserva"
          message={`¿Está seguro que desea cancelar la reserva #${reservationToCancel}?`}
          onCancelConfirm={handleConfirmCancel}
          onClose={() => setReservationToCancel(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
