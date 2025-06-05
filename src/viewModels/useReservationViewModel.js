import { useState, useCallback } from "react";
import Reservation from "../models/Reservation";
import reservationService from "../services/reservationService";
import validationService from "../services/validationService";

export default function useReservationViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const createReservation = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validaciones
      validationService.validateBusinessHours(formData.time);
      validationService.validateCapacity(formData.guests);

      // Crear modelo
      const reservation = new Reservation(formData);

      // Guardar reserva
      await reservationService.saveReservation(reservation);

      // Confirmación
      setConfirmation({
        id: reservation.id,
        date: reservation.date,
        time: reservation.time,
        message: `Reserva confirmada para ${reservation.date} a las ${reservation.time}`,
      });

      return reservation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelReservation = useCallback(async (reservationId) => {
    setIsLoading(true);
    setError(null);

    try {
      const reservation = await reservationService.getReservation(
        reservationId
      );
      if (!reservation) throw new Error("Reserva no encontrada");

      const cancelledReservation = reservation.cancel();
      await reservationService.saveReservation(cancelledReservation);

      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createReservation,
    cancelReservation,
    isLoading,
    error,
    confirmation,
  };
}
