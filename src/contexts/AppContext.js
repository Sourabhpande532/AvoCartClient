import { createContext, useCallback, useContext, useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "./AuthContext";
import { normalizeProduct, normalizeProductList } from "../utils/fallbackImage";

const AppContext = createContext();

const normalizeItemsProduct = (items = []) =>
  (items || []).map((item) =>
    item?.product ? { ...item, product: normalizeProduct(item.product) } : item
  );

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
  const [theme, setTheme] = useState(
    localStorage.getItem("avocart_theme") || "light"
  );
  const [coupon, setCoupon] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const { isAuthenticated } = useAuth();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("avocart_theme", newTheme);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          API.get("/products"),
          API.get("/categories"),
        ]);
        setProducts(normalizeProductList(pRes.data.data.products || []));
        setCategories(cRes.data.data.categories || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const pushAlert = useCallback((a) => {
    const alertId = `${Date.now()}-${Math.random()}`;
    const entry = { ...a, id: alertId };
    setAlert((prev) => [...prev.slice(-2), entry]);
    setTimeout(() => {
      setAlert((prev) => prev.filter((item) => item.id !== alertId));
    }, 3000);
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(normalizeItemsProduct(res.data.data.cart || []));
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId, qty = 1, size = "", silent = false) => {
    try {
      const res = await API.post("/cart", { productId, qty, size });
      setCart(normalizeItemsProduct(res.data.data.cart || []));
      if (!silent) {
        pushAlert({ type: "success", text: "Added to cart" });
      }
    } catch (error) {
      console.error(error);
      if (!silent) {
        pushAlert({ type: "error", text: "Failed to add to cart" });
      }
    }
  };

  const updateCartQty = async (cartItemId, newQty) => {
    try {
      const currentItem = cart.find((item) => item._id === cartItemId);
      const isIncreasing = currentItem ? newQty > currentItem.qty : true;
      await API.put(`/cart/${cartItemId}`, { qty: newQty });
      await fetchCart();
      pushAlert({
        type: "info",
        text: isIncreasing ? "Quantity increased in cart" : "Quantity decreased in cart",
      });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to update cart" });
    }
  };

  const removeFromCart = async (cartItemId, silent = false) => {
    try {
      await API.delete(`/cart/${cartItemId}`);
      await fetchCart();
      if (!silent) {
        pushAlert({ type: "warning", text: "Removed from cart" });
      }
    } catch (error) {
      console.error(error);
      if (!silent) {
        pushAlert({ type: "error", text: "Failed to remove from cart" });
      }
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setWishlist(normalizeItemsProduct(res.data.data.wishlist || []));
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishlist = async (productId, silent = false) => {
    try {
      const res = await API.post("/wishlist", { productId });
      setWishlist(normalizeItemsProduct(res.data.data.wishlist || []));
      if (!silent) {
        pushAlert({ type: "success", text: "Added to wishlist" });
      }
    } catch (error) {
      console.error(error);
      if (!silent) {
        pushAlert({ type: "error", text: "Failed to add to wishlist" });
      }
    }
  };

  const removeFromWishlist = async (id, silent = false) => {
    try {
      await API.delete(`/wishlist/${id}`);
      await fetchWishlist();
      if (!silent) {
        pushAlert({ type: "warning", text: "Removed from wishlist" });
      }
    } catch (error) {
      console.error(error);
      if (!silent) {
        pushAlert({ type: "error", text: "Failed to remove wishlist item" });
      }
    }
  };

  const moveFromCartToWishlist = async (cartItem) => {
    if (!cartItem?.product?._id) return;
    try {
      await addToWishlist(cartItem.product._id, true);
      await removeFromCart(cartItem._id, true);
      pushAlert({ type: "success", text: "Moved to wishlist" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to move item to wishlist" });
    }
  };

  const moveFromWishlistToCart = async (wishlistItem) => {
    if (!wishlistItem?.product?._id) return;
    try {
      await addToCart(wishlistItem.product._id, 1, wishlistItem.size || "M", true);
      await removeFromWishlist(wishlistItem._id, true);
      pushAlert({ type: "success", text: "Moved to cart" });
    } catch (error) {
      console.error(error);
      pushAlert({ type: "error", text: "Failed to move item to cart" });
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await API.get("/addresses");
      setAddresses(res.data.data.addresses || []);
    } catch (error) {
      console.error(error);
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
      pushAlert({ type: "error", text: "Failed to update address" });
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
      const rawOrders = res.data.data.orders || [];
      setOrders(
        rawOrders.map((o) => ({
          ...o,
          items: normalizeItemsProduct(o.items || []),
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrders = async (order) => {
    try {
      const res = await API.post("/orders", order);
      const created = res.data.data.order;
      await fetchOrders();
      await fetchCart();
      setCoupon(0);
      setIsCouponApplied(false);
      pushAlert({ type: "success", text: "Order Placed Successfully." });
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
      console.error(error);
      pushAlert({ type: "error", text: "Failed to delete order" });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
      fetchAddresses();
      fetchOrders();
    } else {
      setCart([]);
      setWishlist([]);
      setAddresses([]);
      setOrders([]);
    }
  }, [isAuthenticated]);

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
        moveFromCartToWishlist,
        moveFromWishlistToCart,
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
        theme,
        toggleTheme,
        pushAlert,
        coupon,
        setCoupon,
        isCouponApplied,
        setIsCouponApplied,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppFeatures = () => useContext(AppContext);
export { AppProvider, AppContext, useAppFeatures };
