import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { getFallbackImage, getProductImage } from "../utils/fallbackImage";

export const Profile = () => {
  const {
    orders,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    loading,
    deleteOrder,
    pushAlert,
  } = useAppFeatures();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(form.zip)) {
      pushAlert({ type: "error", text: "Pincode must be exactly 6 digits." });
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      pushAlert({
        type: "error",
        text: "Phone number must be exactly 10 digits.",
      });
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

  if (loading) {
    return <Loading variant="profile" />;
  }

  const primaryAddress = addresses?.[0];
  const displayPhone = primaryAddress?.phone || "+91 98765 43210";
  const displayAddress = primaryAddress
    ? `${primaryAddress.street}, ${primaryAddress.city}, ${primaryAddress.state} - ${primaryAddress.zip}`
    : "123 Fashion Avenue, Connaught Place, New Delhi - 110001";

  return (
    <div className="container py-5 fade-in">
      <h2 className="attirex-section-title mb-4">MY PROFILE</h2>

      <div className="row g-4">
        {/* LEFT SIDE: User Profile Static Details & Address Management */}
        <div className="col-lg-6">
          {/* AttireX User Profile Card */}
          <div className="attirex-card p-4 mb-4">
            <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4">
              <div
                className="position-relative flex-shrink-0"
                style={{ width: "84px", height: "84px" }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center overflow-hidden shadow-sm w-100 h-100"
                  style={{
                    background: "var(--light-blue)",
                    color: "#ffffff",
                  }}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span className="fs-2 fw-bold">
                      {user?.name?.[0]?.toUpperCase() || "A"}
                    </span>
                  )}
                </div>
                <span
                  title="Online"
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    right: "4px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: "#2ecc71",
                    border: "2px solid #ffffff",
                  }}
                />
              </div>

              <div className="flex-grow-1 text-center text-sm-start">
                <div className="d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center gap-2 mb-2">
                  <h4
                    className="fw-bold mb-0"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {user?.name || "AvoCart Member"}
                  </h4>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-danger rounded-1 fw-semibold"
                  >
                    Logout
                  </button>
                </div>

                <div className="small d-flex flex-column gap-1 mt-2">
                  <div>
                    <span className="text-muted fw-semibold">Email ID: </span>
                    <span>{user?.email || "member@avocart.com"}</span>
                  </div>
                  <div>
                    <span className="text-muted fw-semibold">Phone: </span>
                    <span>{displayPhone}</span>
                  </div>
                  <div>
                    <span className="text-muted fw-semibold">Address: </span>
                    <span>{displayAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="fw-bold mb-0"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Saved Addresses
              </h5>
              <span
                className="badge rounded-pill px-3 py-1"
                style={{ background: "var(--light-blue)", color: "#fff" }}
              >
                {addresses.length}
              </span>
            </div>

            {addresses.length === 0 && (
              <div className="attirex-card p-4 text-center">
                <p className="text-muted small mb-0">
                  No custom addresses saved yet. Add a delivery address below.
                </p>
              </div>
            )}

            <div className="row g-3">
              {addresses.map((a) => (
                <div key={a._id} className="col-md-6">
                  <div className="attirex-card h-100 p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-secondary-subtle text-secondary-emphasis border small">
                        Delivery
                      </span>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-muted p-0 text-decoration-none"
                          onClick={() => onEdit(a)}
                          title="Edit address"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                          onClick={() => deleteAddress(a._id)}
                          title="Delete address"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className="fw-bold mb-1 small">{a.name}</p>
                    <p className="text-muted small mb-1">📞 {a.phone}</p>
                    <p className="small text-muted mb-0">
                      {a.street}, {a.city}, {a.state} - {a.zip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add / Edit Address Form */}
          <div className="attirex-card p-4">
            <h5
              className="fw-bold mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {editingId ? "Edit Address" : "Add New Address"}
            </h5>

            <form onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-semibold text-muted">
                    Full Name
                  </label>
                  <input
                    className="form-control"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold text-muted">
                    Street Address
                  </label>
                  <input
                    className="form-control"
                    placeholder="123 Main St"
                    required
                    value={form.street}
                    onChange={(e) =>
                      setForm({ ...form, street: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    City
                  </label>
                  <input
                    className="form-control"
                    placeholder="City"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    State
                  </label>
                  <input
                    className="form-control"
                    placeholder="State"
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    ZIP Code (6 digits)
                  </label>
                  <input
                    className="form-control"
                    placeholder="110001"
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">
                    Phone Number (10 digits)
                  </label>
                  <input
                    className="form-control"
                    placeholder="9876543210"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <button className="btn attirex-btn-primary w-100 mt-4 py-2 rounded-1 fw-bold text-uppercase">
                {editingId ? "Update Address" : "Save Address"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-link w-100 text-muted text-decoration-none mt-2 small"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      name: "",
                      street: "",
                      city: "",
                      state: "",
                      zip: "",
                      phone: "",
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: Order History */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5
              className="fw-bold mb-0"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Order History
            </h5>
            <span className="text-muted small fw-semibold">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          {orders.length === 0 && (
            <div className="attirex-card p-5 text-center">
              <div className="fs-1 mb-3 text-muted">📦</div>
              <h5
                className="fw-bold mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                No orders found
              </h5>
              <p className="text-muted small mb-0">
                Your completed purchases will appear here.
              </p>
            </div>
          )}

          <div className="d-flex flex-column gap-3">
            {orders.map((o) => (
              <div key={o._id} className="attirex-card overflow-hidden">
                <div
                  className="p-3 border-bottom d-flex justify-content-between align-items-center"
                  style={{ background: "var(--bg-surface-secondary)" }}
                >
                  <div>
                    <span className="text-muted small">Order ID: </span>
                    <span className="fw-bold">#{o._id.slice(-6).toUpperCase()}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill small">
                      Delivered
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                      onClick={() => deleteOrder(o._id)}
                      title="Delete order record"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted small">
                      {new Date(o.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="fw-extrabold">₹{o.total}</span>
                  </div>

                  <div className="d-flex flex-column gap-2 mb-3">
                    {o.items.map((it, index) => {
                      const imgUrl = getProductImage(it.product);
                      return (
                        <div
                          key={index}
                          className="d-flex align-items-center gap-3 p-2 rounded-1 border"
                          style={{ background: "var(--bg-surface-secondary)" }}
                        >
                          <img
                            src={imgUrl}
                            alt={it.product?.title || "Product"}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getFallbackImage(
                                it.product?.title || it.product?.category?.name
                              );
                            }}
                            className="rounded-1"
                            style={{
                              width: 48,
                              height: 48,
                              objectFit: "cover",
                            }}
                          />
                          <div className="flex-grow-1 min-w-0">
                            <p className="mb-0 fw-semibold text-truncate small">
                              {it.product?.title || "Ordered Item"}
                            </p>
                            <p className="text-muted small mb-0">
                              Qty: {it.qty}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="btn attirex-btn-outline btn-sm w-100 rounded-1 fw-bold"
                    onClick={() =>
                      pushAlert({
                        type: "info",
                        text: `Order #${o._id
                          .slice(-6)
                          .toUpperCase()} is delivered and verified.`,
                      })
                    }
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
