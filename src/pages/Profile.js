import { useEffect, useState } from "react";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";

export const Profile = () => {
  const {
    orders,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    loading,
    deleteOrder,
  } = useAppFeatures();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {}, [addresses]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(form.zip)) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    if (editingId) {
      await updateAddress(editingId, form);
      setEditingId(null);
    } else {
      await addAddress(form);
    }
    setForm({ name: "", street: "", city: "", state: "", zip: "", phone: "" });
  };

  const onEdit = (a) => {
    setEditingId(a._id);
    setForm({
      name: a.name,
      street: a.street,
      city: a.city,
      state: a.state,
      zip: a.zip,
      phone: a.phone,
    });
  };

  if (loading) return <p className='text-center py-5 text-muted'>Loading profile...</p>;

  return (
    <div className='container py-5 fade-in'>
      <div className='row g-5'>
        {/* LEFT SIDE: User Profile & Addresses */}
        <div className='col-lg-6'>
          {/* User Banner */}
          <div className='card border shadow-sm p-4 mb-4 rounded-4 bg-body-tertiary'>
            <div className="d-flex align-items-center gap-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center overflow-hidden shadow-sm" style={{ width: '72px', height: '72px' }}>
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className="fs-2 fw-bold">{user?.name?.[0]?.toUpperCase() || "U"}</span>
                )}
              </div>
              <div>
                <h3 className='fw-bold mb-1 text-body'>{user?.name || "User"}</h3>
                <p className="mb-0 text-muted small">{user?.email || "Guest User"}</p>
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className='mb-5'>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className='fw-bold mb-0 text-body'>Saved Addresses</h4>
              <span className="badge bg-primary rounded-pill px-3">{addresses.length}</span>
            </div>

            {addresses.length === 0 && (
              <div className="card border p-4 text-center rounded-3 bg-body-tertiary">
                <p className='text-muted small mb-0'>No addresses saved yet. Add one below.</p>
              </div>
            )}

            <div className="row g-3">
              {addresses.map((a) => (
                <div key={a._id} className='col-md-6'>
                  <div className='card h-100 border shadow-sm p-3 rounded-3'>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-body-secondary text-body border small">Home</span>
                      <div className='d-flex gap-1'>
                        <button
                          className='btn btn-sm btn-link text-muted p-0 text-decoration-none me-2'
                          onClick={() => onEdit(a)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className='btn btn-sm btn-link text-danger p-0 text-decoration-none'
                          onClick={() => deleteAddress(a._id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className='fw-bold mb-1 small text-body'>{a.name}</p>
                    <p className='text-muted small mb-1'>{a.phone}</p>
                    <p className='small text-muted mb-0'>
                      {a.street}, {a.city}, {a.state} - {a.zip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className='card border shadow-sm p-4 rounded-4'>
            <h5 className='fw-bold mb-4 text-body'>
              {editingId ? "Edit Address" : "Add New Address"}
            </h5>

            <form onSubmit={onSubmit}>
              <div className='row g-3'>
                <div className='col-12'>
                  <label className="form-label small fw-semibold text-muted">Full Name</label>
                  <input
                    className='form-control'
                    placeholder='John Doe'
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className='col-12'>
                  <label className="form-label small fw-semibold text-muted">Street Address</label>
                  <input
                    className='form-control'
                    placeholder='123 Main St'
                    required
                    value={form.street}
                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <label className="form-label small fw-semibold text-muted">City</label>
                  <input
                    className='form-control'
                    placeholder='City'
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <label className="form-label small fw-semibold text-muted">State</label>
                  <input
                    className='form-control'
                    placeholder='State'
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <label className="form-label small fw-semibold text-muted">ZIP Code</label>
                  <input
                    className='form-control'
                    placeholder='123456'
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <label className="form-label small fw-semibold text-muted">Phone Number</label>
                  <input
                    className='form-control'
                    placeholder='10-digit number'
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <button className='btn btn-primary w-100 mt-4 py-2 rounded-3 fw-semibold'>
                {editingId ? "Update Address" : "Save Address"}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  className="btn btn-link w-100 text-muted text-decoration-none mt-2 small"
                  onClick={() => { setEditingId(null); setForm({ name: "", street: "", city: "", state: "", zip: "", phone: "" }); }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: Order History */}
        <div className='col-lg-6'>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className='fw-bold mb-0 text-body'>Order History</h4>
            <span className="text-muted small">{orders.length} Orders</span>
          </div>

          {orders.length === 0 && (
            <div className='card border shadow-sm p-5 text-center rounded-4'>
              <div className="fs-1 mb-3 text-muted">📦</div>
              <h5 className="fw-bold mb-1">No orders found</h5>
              <p className='text-muted small mb-0'>Your previous purchases will appear here.</p>
            </div>
          )}

          <div className="d-flex flex-column gap-4">
            {orders.map((o) => (
              <div key={o._id} className='card border shadow-sm rounded-3 overflow-hidden'>
                <div className="card-header bg-body-tertiary border-bottom p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small">Order </span>
                    <span className='fw-bold text-body'>#{o._id.slice(-6)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className='badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill small'>
                      Delivered
                    </span>
                    <button
                      className='btn btn-sm btn-link text-danger p-0 text-decoration-none'
                      onClick={() => deleteOrder(o._id)}
                      title="Delete order record"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="card-body p-3">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted small">{new Date(o.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="fw-bold text-primary">₹{o.total}</span>
                  </div>

                  <div className="d-flex flex-column gap-2 mb-3">
                    {o.items.map((it, index) => (
                      <div key={index} className='d-flex align-items-center gap-3 p-2 bg-body-tertiary rounded-2 border'>
                        <img
                          src={it.product?.images?.[0] || "https://placehold.co/80?text=Product"}
                          alt='product'
                          className="rounded-2"
                          style={{ width: 44, height: 44, objectFit: "cover" }}
                        />
                        <div className='flex-grow-1 min-w-0'>
                          <p className='mb-0 fw-semibold text-truncate small text-body'>
                            {it.product?.title || "Product"}
                          </p>
                          <p className='text-muted small mb-0'>Qty: {it.qty}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    className='btn btn-outline-primary btn-sm w-100 rounded-2 fw-medium'
                    onClick={() => alert('Tracking details sent to your registered email.')}
                  >
                    View Shipment Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
