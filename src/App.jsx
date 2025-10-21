import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages / Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import Men from './components/Men';
import Women from './components/Women';
import Accessories from './components/Accessories';
import Sale from './components/Sale';
import NewArrival from './components/NewArrival';
import Cart from './components/Cart';

// Profile / Features
import ProfileCard from './components/ProfileCard';
import OrdersReturns from "./components/OrdersReturns";
import Rewards from "./components/Rewards";
import Coupons from "./components/Coupons";
import PaymentMethods from './components/PaymentMethods';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/product/:id" element={<Product />} />

        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/newarrival" element={<NewArrival />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<OrdersReturns />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/coupons" element={<Coupons />} />
          <Route path="/paymentMethods" element={<PaymentMethods />} />
      </Routes>
    </Router>
  );
}

export default App;
