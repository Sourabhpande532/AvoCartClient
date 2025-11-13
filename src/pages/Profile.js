import { useEffect, useState } from "react";
import { useAppFeatures } from "../contexts/AppContext";

export const Profile = () => {
    // eslint-disable-next-line no-unused-vars
    const { orders, addresses, addAddress, updateAddress, deleteAddress, loading } = useAppFeatures();

    const [form, setForm] = useState( {
        name: '', street: '', city: '', state: '', zip: '', phone: ''
    } )
    const [editingId, setEditingId] = useState( null );
    useEffect( () => {
        if ( addresses && addresses.length && !editingId ) { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses] );

    const onSubmit = async ( e ) => {
        e.preventDefault();
        if ( editingId ) {
            await updateAddress( editingId, form );
            setEditingId( null );
        } else {
            await addAddress( form );
        }
        setForm( { name: '', street: '', city: '', state: '', zip: '', phone: '' } );
    };

    const onEdit = ( a ) => { setEditingId( a._id ); setForm( { name: a.name, street: a.street, city: a.city, state: a.state, zip: a.zip, phone: a.phone } ); };

    if ( loading ) return <p className="text-center">Loading...</p>
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Profile</h4>
                <p>Name: Demo User</p>
                <p>Email: demo@example.com</p>
                <p>Phone: 9999999999</p>

                <h5 className="mt-4">Addresses</h5>
                { addresses.length === 0 && <p>No addresses yet. Add one below.</p> }
                { addresses.map( a => (
                    <div key={ a._id } className="card mb-2 p-2">
                        { console.log( a ) }

                        <p><strong>{ a.name }</strong> - { a.phone }</p>
                        <p>{ a.street }, { a.city }, { a.state } - { a.zip }</p>
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={ () => onEdit( a ) }>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={ () => deleteAddress( a._id ) }>Delete</button>
                        </div>
                    </div>
                ) ) }

                <h5 className="mt-4">{ editingId ? 'Edit Address' : 'Add Address' }</h5>
                <form onSubmit={ onSubmit }>
                    <div className="mb-2">
                        <input className="form-control" placeholder="Name" value={ form.name } onChange={ ( e ) => setForm( { ...form, name: e.target.value } ) } required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" placeholder="Street" value={ form.street } onChange={ ( e ) => setForm( { ...form, street: e.target.value } ) } required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" placeholder="City" value={ form.city } onChange={ ( e ) => setForm( { ...form, city: e.target.value } ) } required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" placeholder="State" value={ form.state } onChange={ ( e ) => setForm( { ...form, state: e.target.value } ) } required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" placeholder="ZIP" value={ form.zip } onChange={ ( e ) => setForm( { ...form, zip: e.target.value } ) } required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" placeholder="Phone" value={ form.phone } onChange={ ( e ) => setForm( { ...form, phone: e.target.value } ) } required />
                    </div>
                    <button className="btn btn-primary" type="submit">{ editingId ? 'Save' : 'Add' }</button>
                </form>
            </div>
            <div className="col-md-6">
                <h4>Order History</h4>
                { orders.length === 0 && <p>No orders yet.</p> }
                { orders.map( o => (
                    <div key={ o._id } className="card mb-2 p-2">
                        <p><strong>Order ID:</strong> { o._id }</p>
                        <p><strong>Date:</strong> { new Date( o.createdAt ).toLocaleString() }</p>
                        <p><strong>Total:</strong> ₹{ o.total }</p>
                        <div>
                            <strong>Items:</strong>
                            <ul>
                                { o.items.map( ( it ) => (
                                    <li key={ it._id || it.product._id || it.product }>
                                        { typeof it.product === "object" ? it.product.title : it.product } × { it.qty }
                                    </li>
                                ) ) }
                            </ul>
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}