const ConfirmationModal = ({
  title = "Confirmación",
  message,
  reservationId,
  onConfirm,
  onCancel,
  confirmText = "Cancelar",
  cancelText = "Cerrar",
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 4,
          maxWidth: 500,
          width: "90%",
        }}
      >
        <h5>{title}</h5>
        <p>{message}</p>
        {reservationId && (
          <p>
            ID de la reserva: <strong>{reservationId}</strong>
          </p>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onCancel}>{cancelText}</button>
          {onConfirm && <button onClick={onConfirm}>{confirmText}</button>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
