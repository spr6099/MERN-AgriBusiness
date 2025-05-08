import React, { useState } from "react";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import AgriInputs from "./Component/Dealer/AgriProducts";

import TechnicalSupport from "./Component/Dealer/TechnicalSupport";
import FarmEssentials from "./Component/Farmer/FarmEssentials";
import TechSupport from "./Component/Farmer/TechSupport";
import BankDashBoard from "./Component/Bank/BankDashBoard";
import Finance from "./Component/Farmer/Finance";
import BankPage from "./Component/Farmer/bank/BankPage";
import LoanDetails from "./Component/Bank/LoanDetails";
import LoanRequests from "./Component/Bank/LoanRequests";
import Techdata from "./Component/Farmer/Tech/Techdata";
import LoansStatus from "./Component/Farmer/bank/LoansStatus";
import BankReport from "./Component/Admin/reports/BankReport";
import FarmerReport from "./Component/Admin/reports/FarmerReport";
import DealerReport from "./Component/Admin/reports/DealerReport";
import UserReport from "./Component/Admin/reports/UserReport";

function App() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  return (
    <Router>
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
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/viewcategory" element={<ViewCategory />} />
            <Route path="/editcategory" element={<EditCategory />} />
            <Route path="/bankReport" element={<BankReport />} />
            <Route path="/farmerReport" element={<FarmerReport />} />
            <Route path="/dealerReport" element={<DealerReport />} />
            <Route path="/userReport" element={<UserReport />} />

            <Route path="*" element={<Navigate to="/" />} />
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
            <Route path="/farmEssentials" element={<FarmEssentials />} />
            <Route path="/techSupport" element={<TechSupport />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/bankingpage/:id" element={<BankPage />} />
            <Route path="/loanStatus" element={<LoansStatus />} />
            <Route path="/techdata" element={<Techdata />} />

            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : auth.userStatus === "3" ? (
          <>
            <Route path="/" element={<Profile />} />
            <Route path="/agri_inputs" element={<AgriInputs />} />
            <Route path="/technical" element={<TechnicalSupport />} />
          </>
        ) : auth.userStatus === "4" ? (
          <>
            <Route path="/" element={<BankDashBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/loandetails" element={<LoanDetails />} />
            <Route path="/loanrequests" element={<LoanRequests />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
