const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
