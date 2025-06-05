import ReservationItem from "./ReservationItem";

const ReservationList = ({ reservations, onCancel, showActions }) => {
  return (
    <div className="reservation-list">
      <div className="row fw-bold border-bottom pb-2 mb-2">
        <div className="col">ID</div>
        <div className="col">Fecha</div>
        <div className="col">Hora</div>
        <div className="col">Nombre</div>
        <div className="col">Personas</div>
        <div className="col">Estado</div>
        {showActions && <div className="col">Acciones</div>}
      </div>

      {reservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          reservation={reservation}
          onCancel={onCancel}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default ReservationList;
