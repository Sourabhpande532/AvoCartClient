import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/NavbarComp";
import { Home } from "./pages/Home";
import { Wishlist } from "./pages/Wishlist";
import { CartPage } from "./pages/CartPage";
import { AppProvider } from "./contexts/AppContext";
import { ProductListing } from "./pages/ProductListing";
import { ProductDetails } from "./pages/ProductDetails";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Header />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/products" element={ <ProductListing /> } />
                        <Route path="/products/:id" element={ <ProductDetails /> } />
                        <Route path="/wishlist" element={ <Wishlist /> } />
                        <Route path="/cart" element={ <CartPage /> } />
                        <Route path="/profile" element={ <Profile /> } />
                        <Route path="/checkout" element={ <Checkout /> } />
                    </Routes>
                </div>
            </BrowserRouter>
        </AppProvider>
    )
}

export default App;
