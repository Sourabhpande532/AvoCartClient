import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [alert, setAlert] = useState([]);
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          API.get("/products"),
          API.get("/categories"),
        ]);
        setProducts(pRes.data.data.products || []);
        setCategories(cRes.data.data.categories || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const pushAlert = (a) => {
    setAlert((prev) => [...prev, a]);
    setTimeout(() => setAlert((prev) => prev.slice(1)), 3500);
  };

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.data.cart || []);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId, qty = 1, size = "") => {
    try {
      const res = await API.post("/cart", { productId, qty, size });
      setCart(res.data.data.cart || []);
      pushAlert({ type: "Success", text: "Added to cart" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to add to cart" });
    }
  };

  const updateCartQty = async (cartItemId, newQty, oldQty) => {
    const diff = parseInt(newQty) - parseInt(oldQty);
    let trackSize = "";
    if (diff > 0) {
      trackSize = `Qty Increased by ${diff}`;
    } else if (diff < 0) {
      trackSize = `Qty Decreased by ${Math.abs(diff)}`;
    } else {
      trackSize = "Qty Quantity unchanged";
    }
    try {
      await API.put(`/cart/${cartItemId}`, { qty: newQty });
      await fetchCart();
      pushAlert({ type: "info", text: `${trackSize}` });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to update cart" });
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await API.delete(`/cart/${cartItemId}`);
      await fetchCart();
      pushAlert({ type: "warning", text: "Removed from cart" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to remove from cart" });
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setWishlist(res.data.data.wishlist || []);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const res = await API.post("/wishlist", { productId });
      setWishlist(res.data.data.wishlist || []);
      pushAlert({ type: "success", text: "Added to wishlist" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to add to wishlist" });
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);
      await fetchWishlist();
      pushAlert({ type: "warning", text: "Removed from wishlist" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to remove wishlist item" });
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await API.get("/addresses");
      setAddresses(res.data.data.addresses || []);
    } catch (error) {
      throw error;
    }
  };

  const addAddress = async (address) => {
    try {
      const res = await API.post("/addresses", address);
      setAddresses(res.data.data.addresses || []);
      pushAlert({ type: "success", text: "Address added" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to add address" });
    }
  };

  const updateAddress = async (id, dataToUpdates) => {
    try {
      const res = await API.put(`/addresses/${id}`, dataToUpdates);
      await fetchAddresses();
      pushAlert({ type: "info", text: "Address updated" });
      return res.data.data.address;
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to update cart" });
    }
  };

  const deleteAddress = async (id) => {
    try {
      await API.delete(`/addresses/${id}`);
      await fetchAddresses();
      pushAlert({ type: "warning", text: "Address deleted" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to delete address" });
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.data.orders || []);
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrders = async (order) => {
    try {
      const res = await API.post("/orders", order);
      const created = res.data.data.order;
      // refresh orders and cart
      await fetchOrders();
      await fetchCart();
      pushAlert({ type: "success", text: "Order placed successfully" });
      return created;
    } catch (err) {
      console.error(err);
      pushAlert({ type: "error", text: "Failed to place order" });
    }
  };

  const deleteOrder = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
      await fetchOrders();
      pushAlert({ type: "danger", text: "Order deleted" });
    } catch (error) {
      console.log(error);
      pushAlert({ type: "error", text: "Failed to delete order" });
    }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist();
    fetchAddresses();
    fetchOrders();
  }, []);
  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        categories,
        loading,
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
        cart,
        setCart,
        addToCart,
        updateCartQty,
        removeFromCart,
        alert,
        setAlert,
        addAddress,
        addresses,
        orders,
        placeOrders,
        updateAddress,
        deleteAddress,
        globalSearch,
        setGlobalSearch,
        deleteOrder,
      }}>
      {children}
    </AppContext.Provider>
  );
};
const useAppFeatures = () => useContext(AppContext);
export { AppProvider, AppContext, useAppFeatures };
