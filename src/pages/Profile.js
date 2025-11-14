import { useEffect, useState } from "react";
import { useAppFeatures } from "../contexts/AppContext";

export const Profile = () => {
    const { orders, addresses, addAddress, updateAddress, deleteAddress, loading } = useAppFeatures();

    const [form, setForm] = useState({
        name: '', street: '', city: '', state: '', zip: '', phone: ''
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
        setForm({ name: '', street: '', city: '', state: '', zip: '', phone: '' });
    };

    const onEdit = (a) => {
        setEditingId(a._id);
        setForm({
            name: a.name, street: a.street, city: a.city,
            state: a.state, zip: a.zip, phone: a.phone
        });
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="container mt-4">
            <div className="row g-4">

                {/* LEFT SIDE */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-3 mb-4">
                        <h4 className="border-bottom pb-2">Profile</h4>
                        <p><strong>Name:</strong> Demo User</p>
                        <p><strong>Email:</strong> demo@example.com</p>
                        <p><strong>Phone:</strong> 9999999999</p>
                    </div>

                    {/* Address Section */}
                    <div className="card shadow-sm p-3 mt-3">
                        <h5 className="border-bottom pb-2">Saved Addresses</h5>

                        {addresses.length === 0 && <p className="text-muted">No addresses yet. Add one below.</p>}

                        {addresses.map(a => (
                            <div key={a._id} className="card mb-2 p-3 shadow-sm border-0">
                                <p className="fw-bold mb-1">{a.name} <span className="text-muted">({a.phone})</span></p>
                                <p className="mb-2">{a.street}, {a.city}, {a.state} - {a.zip}</p>

                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-primary px-3" onClick={() => onEdit(a)}>Edit</button>
                                    <button className="btn btn-sm btn-outline-danger px-3" onClick={() => deleteAddress(a._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add/Edit Form */}
                    <div className="card shadow-sm p-3 mt-4 mb-4">
                        <h5 className="border-bottom pb-2">{editingId ? "Edit Address" : "Add Address"}</h5>

                        <form onSubmit={onSubmit} className="mt-3">
                            <div className="row g-3">
                                <div className="col-12">
                                    <input className="form-control" placeholder="Name" required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="col-12">
                                    <input className="form-control" placeholder="Street" required
                                        value={form.street}
                                        onChange={e => setForm({ ...form, street: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" placeholder="City" required
                                        value={form.city}
                                        onChange={e => setForm({ ...form, city: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" placeholder="State" required
                                        value={form.state}
                                        onChange={e => setForm({ ...form, state: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" placeholder="ZIP" required
                                        value={form.zip}
                                        onChange={e => setForm({ ...form, zip: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input className="form-control" placeholder="Phone" required
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button className="btn btn-primary w-100 mt-3">
                                {editingId ? "Save Changes" : "Add Address"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-3">
                        <h4 className="border-bottom pb-2">Order History</h4>

                        {orders.length === 0 && (
                            <p className="text-muted">No orders yet.</p>
                        )}

                        {orders.map(o => (
                            <div key={o._id} className="card mb-3 p-3 shadow-sm border-0">
                                <p><strong>Order ID:</strong> {o._id}</p>
                                <p><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</p>
                                <p className="mb-1"><strong>Total:</strong> ₹{o.total}</p>

                                <div className="mt-2">
                                    <strong>Items:</strong>
                                    <ul className="mt-2">
                                        {o.items.map((it) => (
                                            <li key={it._id || it.product._id || it.product}>
                                                {typeof it.product === "object"
                                                    ? it.product.title
                                                    : it.product}
                                                × <strong>{it.qty}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
