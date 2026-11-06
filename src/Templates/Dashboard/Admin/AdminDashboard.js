import { Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar";
import HeaderDash from "./HeaderDash";
import OverViewDash from "./OverViewDash";
import ProfileAdmin from "./ProfileAdmin";

import CategoriesList from "../../Categories/CategoriesList";
import EditCategory from "../../Categories/EditCategory";
import AddCategory from "../../Categories/AddCategory";

import UsersList from "../../Users/UsersList";
import UserDetails from "../../Users/UserDetails";

import ProductsList from "../../Products/ProductsList";
import ProductDetails from "../../Products/ProductDetails";
import AddProduct from "../../Products/AddProduct";
import EditProduct from "../../Products/EditProduct";

import OrderList from "../../Orders/OrderList";
import OrderDetails from "../../Orders/OrderDetails";

import DisplayErrors from "../../Feedback/DisplayErrors";

import "./Dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="adminDash">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="dashContent">
        {/* Header */}
        <HeaderDash />

        {/* Notifications */}
        <DisplayErrors />

        {/* Pages */}
        <main className="dashMainContainer">
          <Routes>
            <Route index element={<OverViewDash />} />

            {/* Products */}
            <Route path="Products" element={<ProductsList mode="dashboard" />} />
            <Route path="Addproduct" element={<AddProduct />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="getProduct/:id" element={<ProductDetails mode="dashboard" />} />
            <Route path="editProduct/:id" element={<EditProduct />} />

            {/* Categories */}
            <Route path="Categories" element={<CategoriesList />} />
            <Route path="AddCategory" element={<AddCategory />} />
            <Route path="EditCategory/:id" element={<EditCategory />} />

            {/* Users */}
            <Route path="Users" element={<UsersList />} />
            <Route path="getUser/:id" element={<UserDetails />} />

            {/* Orders */}
            <Route path="Orders" element={<OrderList />} />
            <Route path="getOrder/:id" element={<OrderDetails />} />

            {/* Profile */}
            <Route path="Profile" element={<ProfileAdmin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
