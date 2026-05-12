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
      className="d-flex flex-column align-items-center"
      style={{
        position: "fixed",
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: "100%",
        zIndex: 3000,
        pointerEvents: "none",
      }}
    >
      <div className="d-flex flex-column gap-2" style={{ maxWidth: "400px", width: "90%" }}>
        {alert.map((a, i) => (
          <div
            key={i}
            className={`alert glass border-0 shadow-lg fade show d-flex align-items-center justify-content-between p-3 rounded-4 fade-in`}
            style={{
              pointerEvents: "auto",
              borderLeft: `5px solid ${
                a.type === "error" ? "#ef4444" : a.type === "success" ? "#10b981" : "#6366f1"
              }`
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <span className="fs-4">
                {a.type === "error" ? "🚫" : a.type === "success" ? "✨" : "💡"}
              </span>
              <span className="fw-semibold small">{a.text}</span>
            </div>

            <button
              type="button"
              className="btn-close shadow-none small"
              onClick={() => onClear && onClear()}
              style={{ fontSize: '0.7rem' }}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
}

