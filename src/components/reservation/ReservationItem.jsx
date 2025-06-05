const ReservationItem = ({ reservation, onCancel, showActions }) => {
  return (
    <div className="row border py-2 align-items-center">
      <div className="col">{reservation.id.slice(-6)}</div>
      <div className="col">{reservation.date}</div>
      <div className="col">{reservation.time}</div>
      <div className="col">{reservation.name}</div>
      <div className="col">{reservation.guests}</div>
      <div className="col">
        <span
          className={`badge ${
            reservation.status === "confirmed" ? "bg-success" : "bg-secondary"
          }`}
        >
          {reservation.status === "confirmed" ? "Confirmada" : "Cancelada"}
        </span>
      </div>
      {showActions && reservation.status === "confirmed" && (
        <div className="col">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onCancel(reservation.id)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationItem;
