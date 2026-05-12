import React from 'react';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column gap-3" style={{ minHeight: '60vh' }}>
      <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fw-semibold">Setting things up for you...</p>
    </div>
  );
}