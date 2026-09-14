const PopupMessage = ({ show:display, message, onClose }) => {
  if (!display) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 2000,
      }}
    >
      <div className="bg-body border rounded-4 p-4 shadow-lg text-center" style={{ width: "320px", maxWidth: "90%" }}>
        <div className="fs-3 mb-2">ℹ️</div>
        <h5 className="mb-2 fw-bold">Notice</h5>
        <p className="text-muted small mb-4">{message}</p>
        <button className="btn btn-primary w-100 py-2 rounded-3 fw-semibold" onClick={onClose}>
          Understood
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
