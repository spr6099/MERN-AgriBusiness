import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Sidebar from "./Component/Sidebar";
import Header from "./Component/Header";
import NewFarmer from "./Component/Admin/NewFarmer";
import FarmerList from "./Component/Admin/FarmerList";
import Profile from "./Component/Admin/Profile";
import Complaints from "./Component/Admin/Complaints";
import Viewproduct from "./Component/Admin/Viewproduct";
import SaleList from "./Component/Admin/SaleList";
import AddCategory from "./Component/Admin/AddCategory";
import ViewCategory from "./Component/Admin/ViewCategory";
import EditCategory from "./Component/Admin/EditCategory";
import CategoryView from "./Component/Farmer/CategoryView";
import ViewProducts from "./Component/Farmer/ViewProduct";
import AddProduct from "./Component/Farmer/AddProduct";
import EditProduct from "./Component/Farmer/EditProduct";
import AddCultivation from "./Component/Farmer/Addcultivation";
import ViewCultivation from "./Component/Farmer/ViewCultivation";
import UpdateCultivation from "./Component/Farmer/Updatecultivation";
import SaleReport from "./Component/Farmer/SaleReport";
import ViewFeedback from "./Component/Farmer/ViewFeedback";
import Viewrating from "./Component/Farmer/ShowRating";
import NewDealer from "./Component/Admin/NewDealer";
import DealerList from "./Component/Admin/DealerList";
import Newbanker from "./Component/Admin/NewBankers";
import BankerList from "./Component/Admin/BankerList";

function App() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  return (
    <BrowserRouter>
      <Routes>
        {auth == null ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : auth.userStatus === "0" ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/head" element={<Header />} />
            <Route path="/side" element={<Sidebar />} />
            <Route path="/newfarmer" element={<NewFarmer />} />
            <Route path="/newdealer" element={<NewDealer />} />
            <Route path="/newbankers" element={<Newbanker />} />
            <Route path="/farmerlist" element={<FarmerList />} />
            <Route path="/dealerlist" element={<DealerList />} />
            <Route path="/bankerlist" element={<BankerList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/products" element={<Viewproduct />} />
            <Route path="/salelist" element={<SaleList />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/viewcategory" element={<ViewCategory />} />
            <Route path="/editcategory" element={<EditCategory />} />
          </>
        ) : auth.userStatus === "1" ? (
          <>
            <Route path="/" element={<Profile />} />

            <Route path="/category" element={<CategoryView />} />
            <Route path="/viewproducts" element={<ViewProducts />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/editproduct" element={<EditProduct />} />
            <Route path="/addcultivation" element={<AddCultivation />} />
            <Route path="/viewcultivation" element={<ViewCultivation />} />
            <Route path="/updatecultivation" element={<UpdateCultivation />} />
            <Route path="/salereport" element={<SaleReport />} />
            <Route path="/viewfeedback" element={<ViewFeedback />} />
            <Route path="/viewrating" element={<Viewrating />} />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : auth.userStatus === "3" ? (
          <>
            <Route path="/" element={<Profile />}/> 
            
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
