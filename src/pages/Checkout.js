import { useNavigate } from "react-router-dom"
import { useAppFeatures } from "../contexts/AppContext";
import { useState } from "react";

export const Checkout = () => {
    const { cart, addresses, placeOrders } = useAppFeatures();
    // eslint-disable-next-line no-unused-vars
    const [selectedAddress, setSelectedAddress] = useState( addresses[0] || null );
    console.log(addresses);
    
    const navigate = useNavigate();

    const {finalTotal} = cart.reduce(
        ( acc, { product, qty } ) => {
            const { price, discount = 0, deliveryCharge = 0 } = product;
            const discountAmount = (price * discount) / 100;
            acc.finalTotal += (price - discountAmount) * qty + deliveryCharge;
            return acc;
        },
        { finalTotal: 0 }
    )

    const doCheckout = async () => {
        const order = await placeOrders( { items: cart.map( ci => ( { product: ci.product._id, qty: ci.qty } ) ), finalTotal, address: selectedAddress } );
        if ( order ) navigate( '/profile' );
    };
    return (
        <div>
            <h4>Checkout</h4>
            <p>Total: ₹<strong>{ finalTotal }</strong></p>
            <button className="btn btn-primary" onClick={ doCheckout }>Place Order</button>

        </div>
    )
}