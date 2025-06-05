import { useState } from "react";
import useReservationViewModel from "../../viewModels/useReservationViewModel";
import TimeSlotPicker from "../ui/TimeSlotPicker";

const ReservationForm = ({ onReservationCreated }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "19:00",
    guests: 2,
    name: "",
    phone: "",
  });

  const { createReservation, isLoading, error } = useReservationViewModel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReservation = await createReservation(formData);
      if (onReservationCreated) {
        onReservationCreated(newReservation);
      }
      // Limpiar el formulario tras enviar
      setFormData({
        date: new Date().toISOString().split("T")[0],
        time: "19:00",
        guests: 2,
        name: "",
        phone: "",
      });
    } catch (err) {
      console.error("Error al crear reserva:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="reservation-form card p-4 shadow-sm"
    >
      <div className="mb-3">
        <label className="form-label">Fecha:</label>
        <input
          type="date"
          className="form-control"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Hora:</label>
        <TimeSlotPicker
          value={formData.time}
          onChange={(time) => setFormData({ ...formData, time })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Personas:</label>
        <select
          className="form-select"
          value={formData.guests}
          onChange={(e) =>
            setFormData({ ...formData, guests: parseInt(e.target.value) })
          }
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "persona" : "personas"}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono:</label>
        <input
          type="tel"
          className="form-control"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Procesando..." : "Confirmar Reserva"}
      </button>
    </form>
  );
};

export default ReservationForm;
