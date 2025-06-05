import { useState, useEffect } from "react";
import reservationService from "../services/reservationService";

export default function useAdminViewModel() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const loadReservations = async () => {
    try {
      setLoading(true);
      const allReservations = await reservationService.getAllReservations();
      setReservations(allReservations);
    } catch (err) {
      setError("Error al cargar las reservas: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId) => {
    try {
      setLoading(true);
      setError(null);
      await reservationService.cancelReservation(reservationId);
      await loadReservations();
      setSuccessMessage("La reserva se canceló exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Error al cancelar la reserva: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return {
    reservations,
    loading,
    error,
    successMessage,
    cancelReservation,
    refreshReservations: loadReservations,
  };
}
