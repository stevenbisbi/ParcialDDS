import { useState } from "react";
import reservationService from "../services/reservationService";
import validationService from "../services/validationService";

export default function useReservationViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const createReservation = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      validationService.validateBusinessHours(formData.time);
      validationService.validateCapacity(formData.guests);

      const newReservation = await reservationService.createReservation(
        formData
      );

      setConfirmation({
        id: newReservation.id,
        date: newReservation.date,
        time: newReservation.time,
        message: `Reserva confirmada para ${newReservation.date} a las ${newReservation.time}`,
      });

      return newReservation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createReservation,
    isLoading,
    error,
    confirmation,
  };
}
