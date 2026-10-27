import React from "react";

export default function Alerts({ alert = [], onClear }) {
  if (!alert || alert.length === 0) return null;

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
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
          const icon = isError ? "🚫" : isSuccess ? "✓" : isWarning ? "⚠️" : "";

          return (
            <div
              key={a.id || i}
              className="alert glass text-body border shadow-sm fade show d-flex align-items-center justify-content-between p-3 rounded-3 fade-in mb-0"
              style={{
                pointerEvents: "auto",
                borderLeft: `4px solid ${
                  isError ? "#ef4444" : isSuccess ? "#10b981" : isWarning ? "#f59e0b" : "#2563eb"
                }`,
              }}
            >
              <div className="d-flex align-items-center gap-2">
                {icon && <span className="fs-6">{icon}</span>}
                <span className="fw-semibold small">{a.text}</span>
              </div>

              <button
                type="button"
                className="btn-close shadow-none small ms-2"
                onClick={() => onClear && onClear(a.id)}
                aria-label="Close alert"
                style={{ fontSize: "0.75rem" }}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
