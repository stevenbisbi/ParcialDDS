import ReservationItem from "./ReservationItem";

const ReservationList = ({ reservations, onCancel, showActions }) => {
  return (
    <div className="reservation-list">
      <div className="reservation-header">
        <span>ID</span>
        <span>Fecha</span>
        <span>Hora</span>
        <span>Nombre</span>
        <span>Personas</span>
        <span>Estado</span>
        {showActions && <span>Acciones</span>}
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
