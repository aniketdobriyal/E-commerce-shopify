import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./routes/ProtectedRoute";

// Buyer pages
import Dashboard from './components/buyer/Dashboard';
import Login from './components/buyer/Login';
import Signup from './components/buyer/Signup';
import Register from "./components/buyer/Register";
import VerifyEmail from "./components/buyer/VerifyEmail";
import ProfileCard from './components/buyer/ProfileCard';
import Product from './components/buyer/Product';
import Men from './components/buyer/Men';
import Women from './components/buyer/Women';
import Accessories from './components/buyer/Accessories';
import Sale from './components/buyer/Sale';
import NewArrival from './components/buyer/NewArrival';
import Cart from './components/buyer/Cart';
import OrdersReturns from "./components/buyer/OrdersReturns";
import Rewards from "./components/buyer/Rewards";
import Coupons from "./components/buyer/Coupons";
import SelectAddress from "./components/buyer/SelectAddress";
import PaymentMethods from './components/buyer/PaymentMethods';

// Seller pages
import SellerLogin from './components/seller/SellerLogin';
import SellerDashboard from './components/seller/SellerDashboard';
import SellerProducts from './components/seller/SellerProducts';
import SellerOrders from './components/seller/SellerOrders';
import SellerProfile from './components/seller/SellerProfile';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Routes>

              {/* Public Buyer Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/newarrival" element={<NewArrival />} />

              {/* Protected Buyer Routes */}
          
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersReturns />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <ProtectedRoute>
                    <Rewards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coupons"
                element={
                  <ProtectedRoute>
                    <Coupons />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/paymentMethods"
                element={
                  <ProtectedRoute>
                    <PaymentMethods />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/select-address/:id"
                element={
                  <ProtectedRoute>
                    <SelectAddress />
                  </ProtectedRoute>
                }
              />

              {/* Seller Routes */}
              <Route path="/seller/login" element={<SellerLogin />} />

              <Route
                path="/seller/dashboard"
                element={
                  <ProtectedRoute>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/products"
                element={
                  <ProtectedRoute>
                    <SellerProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/orders"
                element={
                  <ProtectedRoute>
                    <SellerOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/profile"
                element={
                  <ProtectedRoute>
                    <SellerProfile />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
