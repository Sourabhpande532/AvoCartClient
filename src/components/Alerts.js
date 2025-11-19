import React, { useEffect } from "react";

export default function Alerts({ alert = [], onClear }) {
  useEffect(() => {
    if (alert.length) {
      const t = setTimeout(() => onClear && onClear(), 3000);
      return () => clearTimeout(t);
    }
  }, [alert, onClear]);

  if (!alert || alert.length === 0) return null;

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        position: "fixed",
        top: 80,
        left: 0,
        width: "100%",
        zIndex: 3000,
        pointerEvents: "none",
      }}
    >
      <div style={{ maxWidth: "600px", width: "90%" }}>
        {alert.map((a, i) => (
          <div
            key={i}
            className={`alert alert-${
              a.type === "error"
                ? "danger"
                : a.type === "success"
                ? "success"
                : "primary"
            } shadow-lg border-0 fade show`}
            style={{
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "16px",
              fontWeight: "500",
              color: "white", // Always visible
              backgroundColor:
                a.type === "error"
                  ? "#d9534f" // dark red
                  : a.type === "success"
                  ? "#28a745" // dark green
                  : "#0d6efd", // strong blue
              pointerEvents: "auto",
            }}
          >
            {a.type === "error"
              ? "❌ "
              : a.type === "success"
              ? "✅ "
              : "ℹ️ "}
            {a.text}

            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              onClick={() => onClear && onClear()}
              style={{ float: "right" }}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
}

