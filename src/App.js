import "./App.css";
import Header from "./Templates/Shop/Components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Templates/Shop/Components/Home";
import Register from "./Templates/Shop/User/Register";
import Login from "./Templates/Shop/User/Login";
import Profile from "./Templates/Shop/User/Profile";
import AdminDashboard from "./Templates/Dashboard/Admin/AdminDashboard";
import PrivateRoute from "./Templates/Shop/Components/PrivateRoute";
import DisplayErrors from "./Templates/Feedback/DisplayErrors";
import ProductsList from "./Templates/Products/ProductsList";
import ProductDetail from "./Templates/Products/ProductDetails";
import Cart from "./Templates/Orders/Cart";
import Checkout from "./Templates/Orders/Checkout";
import MyOrders from "./Templates/Orders/MyOrders";
import ActivateAccount from "./Templates/Users/ActivateAccount";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {!location.pathname.startsWith("/Dashboard") && (
        <div className="headerContainer">
          <Header />
          <DisplayErrors />
        </div>
      )}

      {location.pathname.startsWith("/Dashboard") && <DisplayErrors />}
      {/* {!location.pathname.startsWith("/Dashboard") && <Header></Header>}
      <DisplayErrors></DisplayErrors> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ConfirmOrder" element={<Checkout></Checkout>} />
        <Route path="/MyOrders" element={<MyOrders></MyOrders>} />
        <Route
          path="/Products"
          element={<ProductsList mode="shop"></ProductsList>}
        />
        <Route path="/getProduct/:id" element={<ProductDetail mode="shop" />} />
        <Route
          path="/Dashboard/*"
          element={
            // <PrivateRoute role="admin">
            <AdminDashboard /> // </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
