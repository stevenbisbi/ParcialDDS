const ReservationItem = ({ reservation, onCancel, showActions }) => {
  return (
    <div className={`reservation-item ${reservation.status}`}>
      <span>{reservation.id}</span>
      <span>{reservation.date}</span>
      <span>{reservation.time}</span>
      <span>{reservation.name}</span>
      <span>{reservation.guests}</span>
      <span className="status">
        {reservation.status === "confirmed" ? "Confirmada" : "Cancelada"}
      </span>
      {showActions && reservation.status === "confirmed" && (
        <span className="actions">
          <button
            className="cancel-btn"
            onClick={() => onCancel(reservation.id)}
          >
            Cancelar
          </button>
        </span>
      )}
    </div>
  );
};

export default ReservationItem;
