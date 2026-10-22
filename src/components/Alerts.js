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
      <div className="d-flex flex-column gap-2" style={{ maxWidth: "420px", width: "90%" }}>
        {alert.map((a, i) => {
          const type = (a.type || "").toLowerCase();
          const isError = type === "error" || type === "danger";
          const isSuccess = type === "success";
          const isWarning = type === "warning";

          return (
            <div
              key={i}
              className="alert glass border shadow-sm fade show d-flex align-items-center justify-content-between p-3 rounded-3 fade-in"
              style={{
                pointerEvents: "auto",
                borderLeft: `4px solid ${
                  isError ? "#ef4444" : isSuccess ? "#10b981" : isWarning ? "#f59e0b" : "#2563eb"
                }`
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <span className="fs-5">
                  {isError ? "🚫" : isSuccess ? "✓" : isWarning ? "⚠️" : ""}
                </span>
                <span className="fw-semibold small">{a.text}</span>
              </div>

              <button
                type="button"
                className="btn-close shadow-none small ms-2"
                onClick={() => onClear && onClear()}
                style={{ fontSize: '0.75rem' }}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
