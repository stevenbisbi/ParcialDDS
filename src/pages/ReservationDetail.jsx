import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reservationService from "../services/reservationService";
import ConfirmationModal from "../components/ui/ConfirmationModal";

const ReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true);
        const res = await reservationService.getReservation(id);
        if (!res) {
          throw new Error("Reserva no encontrada");
        }
        setReservation(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleCancel = async () => {
    try {
      await reservationService.cancelReservation(id);
      setCancelSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError("Error al cancelar la reserva: " + err.message);
    }
  };

  if (loading) return <p>Cargando reserva...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!reservation) return <p>No se encontró la reserva</p>;

  return (
    <div className="reservation-detail">
      <h2>Detalle de tu Reserva</h2>

      <div className="reservation-info">
        <p>
          <strong>ID:</strong> {reservation.id}
        </p>
        <p>
          <strong>Fecha:</strong> {reservation.date}
        </p>
        <p>
          <strong>Hora:</strong> {reservation.time}
        </p>
        <p>
          <strong>Personas:</strong> {reservation.guests}
        </p>
        <p>
          <strong>Nombre:</strong> {reservation.name}
        </p>
        <p>
          <strong>Estado:</strong>
          <span className={`status ${reservation.status}`}>
            {reservation.status === "confirmed" ? "Confirmada" : "Cancelada"}
          </span>
        </p>
      </div>

      {reservation.status === "confirmed" && (
        <button className="cancel-btn" onClick={() => setShowCancelModal(true)}>
          Cancelar Reserva
        </button>
      )}

      {showCancelModal && (
        <ConfirmationModal
          title="Confirmar Cancelación"
          message="¿Estás seguro que deseas cancelar esta reserva?"
          onConfirm={handleCancel}
          onCancel={() => setShowCancelModal(false)}
        />
      )}

      {cancelSuccess && (
        <div className="success-message">
          <p>Tu reserva ha sido cancelada exitosamente.</p>
          <p>Serás redirigido a la página principal...</p>
        </div>
      )}
    </div>
  );
};

export default ReservationDetail;
