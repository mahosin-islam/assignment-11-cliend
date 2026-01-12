import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Mainpages/Home/Home";
import Login from "../Authentication/Login";
import SingUp from "../Authentication/SingUp";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardPages/DashboardHome/DashboardHome";
import Myprofile from "../Pages/DashboardPages/Myprofile/Myprofile";
import Aboutus from "../Pages/Mainpages/Aboutus/Aboutus";
import Contact from "../Pages/Mainpages/Contact/Contact";
import Private from "./Private";
import Addproduct from "../Pages/DashboardPages/Addproduct/Addproduct";
import Dtails from "../components/Dtails/Dtails";
import ErrorPage from "../Extra/Errorpage";
import Order from "../components/Shavre/Order";
import Success from "../components/PaymentInfo/Success";
import Cancel from "../components/PaymentInfo/Cancel";
import Myorder from "../components/Dashbord/Buyer/Myorder";
import Manageuser from "../components/Dashbord/Admin/Manageuser";
import AllProducts from "../components/Dashbord/Admin/AllProducts";
import Allorders from "../components/Dashbord/Admin/Allorders";
import Allproduct from "../Pages/Mainpages/AllProducts/Allproduct";
import Manageproduct from "../components/Dashbord/Manage/Manageproduct";
import Pendingorder from "../components/Dashbord/Manage/Pendingorder";
import Approveorder from "../components/Dashbord/Manage/Approveorder";
import Trackorder from "../components/Dashbord/Buyer/Trackorder";
import Suspend from "../components/Dashbord/Admin/Suspend";
import Update from "../components/Dashbord/Admin/Update";
import Orderdtails from "../components/Dashbord/Admin/Orderdtails";
import Track from "../components/Dashbord/Manage/Track";
import Buyerporvider from "./Buyerporvider";
import Adminporvider from "./Adminporvider";
import Manerporvider from "./Manerporvider";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <p>load...</p>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Home",
        element: <Home></Home>,
      },
      {
        path: "/Allporduct",
        element: <Allproduct></Allproduct>,
      },
      {
        path: "/Aboutus",
        element: <Aboutus></Aboutus>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/Singup",
        element: <SingUp></SingUp>,
      },
      {
        path: "/Dtails/:id",
        element: <Dtails></Dtails>,
      },
      {
        path: "/order",
        element: <Order></Order>,
      },
      {
        path: "suspend",
        element: <Suspend></Suspend>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <Private>
        <DashboardLayout></DashboardLayout>
      </Private>
    ),

    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "Myprofile",
        element: <Myprofile></Myprofile>,
      },
      //payment-method
      { path: "successful", element: <Success></Success> },
      {
        path: "Cancel-pay",
        element: <Cancel></Cancel>,
      }, //extar-router
      {
        path: "Update/:id",
        element: <Update></Update>,
      },
      { path: "Tracking/:id", element: <Track></Track> },
      {
        path: "Order-dtails/:id",
        element: <Orderdtails></Orderdtails>,
      },
      //admin-routers
      {
        path: "manage-users",
        element: (
          <Adminporvider>
            <Manageuser></Manageuser>
          </Adminporvider>
        ),
      },
      {
        path: "all-products",
        element: (
          <Adminporvider>
            <AllProducts></AllProducts>
          </Adminporvider>
        ),
      },
      {
        path: "all-orders",

        element: (
          <Adminporvider>
            <Allorders></Allorders>
          </Adminporvider>
        ),
      },
      //  manage-routers
      {
        path: "Add-product",
        element: (
          <Manerporvider>
            <Addproduct></Addproduct>
          </Manerporvider>
        ),
      },
      {
        path: "Manage-Products",
        element: (
          <Manerporvider>
            <Manageproduct></Manageproduct>
          </Manerporvider>
        ),
      },
      {
        path: "Pending-Orders",
        element: (
          <Manerporvider>
            <Pendingorder></Pendingorder>
          </Manerporvider>
        ),
      },
      {
        path: "Approve-Orders",
        element: (
          <Manerporvider>
            <Approveorder></Approveorder>
          </Manerporvider>
        ),
      },

      //buyer-routers
      {
        path: "My-order",
        element: (
          <Buyerporvider>
            <Myorder></Myorder>
          </Buyerporvider>
        ),
      },
      {
        path: "Track-Order",
        element: (
          <Buyerporvider>
            <Trackorder></Trackorder>
          </Buyerporvider>
        ),
      },
    ],
  },
]);
