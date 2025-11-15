import { useEffect, useState } from "react";
import { useAppFeatures } from "../contexts/AppContext";

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

  if (loading) return <p className='text-center mt-5'>Loading...</p>;

  return (
    <div className='container mt-4'>
      <div className='row g-4'>
        {/* LEFT SIDE */}
        <div className='col-md-6'>
          <div className='card shadow-sm p-3 mb-4'>
            <h4 className='border-bottom pb-2'>Profile</h4>
            <p>
              <strong>Name:</strong> Demo User
            </p>
            <p>
              <strong>Email:</strong> demo@example.com
            </p>
            <p>
              <strong>Phone:</strong> 9999999999
            </p>
          </div>

          {/* Address Section */}
          <div className='card shadow-sm p-3 mt-3'>
            <h5 className='border-bottom pb-2'>Saved Addresses</h5>

            {addresses.length === 0 && (
              <p className='text-muted'>No addresses yet. Add one below.</p>
            )}

            {addresses.map((a) => (
              <div key={a._id} className='card mb-2 p-3 shadow-sm border-0'>
                <p className='fw-bold mb-1'>
                  {a.name} <span className='text-muted'>({a.phone})</span>
                </p>
                <p className='mb-2'>
                  {a.street}, {a.city}, {a.state} - {a.zip}
                </p>

                <div className='d-flex gap-2'>
                  <button
                    className='btn btn-sm btn-outline-primary px-3'
                    onClick={() => onEdit(a)}>
                    Edit
                  </button>
                  <button
                    className='btn btn-sm btn-outline-danger px-3'
                    onClick={() => deleteAddress(a._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Form */}
          <div className='card shadow-sm p-3 mt-4 mb-4'>
            <h5 className='border-bottom pb-2'>
              {editingId ? "Edit Address" : "Add Address"}
            </h5>

            <form onSubmit={onSubmit} className='mt-3'>
              <div className='row g-3'>
                <div className='col-12'>
                  <input
                    className='form-control'
                    placeholder='Name'
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className='col-12'>
                  <input
                    className='form-control'
                    placeholder='Street'
                    required
                    value={form.street}
                    onChange={(e) =>
                      setForm({ ...form, street: e.target.value })
                    }
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    className='form-control'
                    placeholder='City'
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    className='form-control'
                    placeholder='State'
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    className='form-control'
                    placeholder='ZIP'
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    className='form-control'
                    placeholder='Phone'
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <button className='btn btn-primary w-100 mt-3'>
                {editingId ? "Save Changes" : "Add Address"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='col-md-6'>
          <div className='card shadow-sm p-3'>
            <h4 className='border-bottom pb-2'>Order History</h4>

            {orders.length === 0 && (
              <p className='text-muted mt-2'>No orders yet.</p>
            )}

            {orders.map((o) => (
              <div
                key={o._id}
                className='card mb-3 p-3 border-0 shadow-sm order-card position-relative'>
                {/* Delete Button */}
                <button
                  className='order-delete-btn'
                  onClick={() => deleteOrder(o._id)} // add deleteOrder(o._id)
                >
                  🗑️
                </button>

                {/* Order Header */}
                <div className='d-flex justify-content-between align-items-center mb-2'>
                  <span className='fw-bold'>Order #{o._id.slice(-6)}</span>
                  <span className='badge bg-success px-3 py-2'>Delivered</span>
                </div>

                <p className='text-muted small mb-2'>
                  {new Date(o.createdAt).toLocaleString()}
                </p>

                {/* Total */}
                <h6 className='mb-3'>
                  Total Paid:{" "}
                  <span className='text-primary fw-bold'>₹{o.total}</span>
                </h6>

                {/* Item List */}
                {o.items.map((it, index) => (
                  <div
                    key={index}
                    className='d-flex align-items-center border-bottom pb-2 mb-2'>
                    <img
                      src={
                        it.product?.images?.[0] || "https://picsum.photos/80"
                      }
                      alt='product'
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        objectFit: "cover",
                        marginRight: 12,
                      }}
                    />

                    <div className='flex-grow-1'>
                      <p className='mb-1 fw-semibold'>
                        {it.product?.title || "Product removed"}
                      </p>
                      <p className='text-muted small mb-0'>Qty: {it.qty}</p>
                    </div>
                  </div>
                ))}

                <button className='btn btn-outline-primary w-100 mt-2'>
                  View Order Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
