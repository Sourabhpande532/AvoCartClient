import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/NavbarComp";
import { Home } from "./pages/Home";
import { Wishlist } from "./pages/Wishlist";
import { CartPage } from "./pages/CartPage";
import { AppProvider, useAppFeatures } from "./contexts/AppContext";
import { ProductListing } from "./pages/ProductListing";
import { ProductDetails } from "./pages/ProductDetails";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";
import Alerts from "./components/Alerts";
import Loading from "./components/Loading";

function AppContent() {
    const { alert, setAlert, loading } = useAppFeatures();
    return (
        <>
            <Header />
            <Alerts alert={ alert } onClear={ () => setAlert( [] ) } />
            <div className="container mt-4">
                { loading ? <Loading /> : (
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/products" element={ <ProductListing /> } />
                        <Route path="/products/:id" element={ <ProductDetails /> } />
                        <Route path="/wishlist" element={ <Wishlist /> } />
                        <Route path="/cart" element={ <CartPage /> } />
                        <Route path="/profile" element={ <Profile /> } />
                        <Route path="/checkout" element={ <Checkout /> } />
                    </Routes>
                ) }
            </div>
        </>
    )
}

export default function App(){
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

/* To Understand: 
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
*/
