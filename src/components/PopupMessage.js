const PopupMessage = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.5)",
        zIndex: 2000,
      }}
    >
      <div className="card p-4 shadow-lg text-center" style={{ width: "300px" }}>
        <h5 className="mb-3">Alert</h5>
        <p>{message}</p>
        <button className="btn btn-primary mt-2" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
