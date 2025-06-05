const CancelModal = ({ title, message, onCancelConfirm, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h5>{title}</h5>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onCancelConfirm} className="btn-confirm">
            Confirmar
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
