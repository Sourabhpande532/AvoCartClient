import { useAppFeatures } from "../contexts/AppContext";

export const Profile = () => {
    const { orders,addAddress, loading } = useAppFeatures();
   
    const user = { name: 'John Doe', email: 'demo@example.com', phone: '9999999999' };
    if ( loading ) return <p className="text-center">Loading...</p>
    return (
        <div>
            { Array.isArray( orders ) && orders.length > 0 ? (
                <div className="row g-4">
                    { orders?.map( ( users ) => (
                        <div key={ users._id } className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h3>Name: { users?.address?.name || user.name}</h3>
                                    <p>Email: { user?.email }</p>
                                    <p>Phone: { users.address?.phone || +917343233232}</p>
                                    <p>Address: { `${ users?.address?.street || "Parwe Pump" }, ${ users?.address?.state || "MH"}` }</p>
                                </div>
                            </div>
                        </div>
                    ) ) }
                </div>
            ) : (
                <div>
                    <p>No order found.</p>
                </div >
            ) }
        </div >
    );
}