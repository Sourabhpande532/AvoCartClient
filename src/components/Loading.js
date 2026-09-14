import React from 'react';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column gap-3" style={{ minHeight: '50vh' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '2.5rem', height: '2.5rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted small fw-medium">Loading catalog content...</p>
    </div>
  );
}