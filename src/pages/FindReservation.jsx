import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FindReservation = () => {
  const [reservationId, setReservationId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reservationId.trim()) {
      setError("Por favor ingrese el ID de su reserva");
      return;
    }
    navigate(`/reservation/${reservationId}`);
  };

  return (
    <div className="find-reservation">
      <h2>Buscar mi Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reservationId">ID de Reserva:</label>
          <input
            type="text"
            id="reservationId"
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
            placeholder="Ingrese el ID que recibió por correo"
          />
          {error && <p className="error">{error}</p>}
        </div>
        <button type="submit">Buscar Reserva</button>
      </form>
    </div>
  );
};

export default FindReservation;
