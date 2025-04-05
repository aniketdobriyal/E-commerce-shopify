import './App.css'
import Dashboard from './components/Dashboard'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {



  return (
   
    <Router>
    <Routes>
    <Route path = "/" element={<Dashboard/>} />
   <Route path = "/dashboard" element={<Dashboard/>} />
   <Route path = "/login" element={<Login/>} />
   <Route path = "/signup" element={<Signup/>} />
   <Route path="/product/:id" element={<Product />} />

   </Routes>
   </Router>
  
  )
}

export default App
