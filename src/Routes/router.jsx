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
import Buyerprofile from "../components/Dashbord/Buyer/Buyerprofile";
import Suspend from "../components/Dashbord/Admin/Suspend";
import Update from "../components/Dashbord/Admin/Update";
import Orderdtails from "../components/Dashbord/Admin/Orderdtails";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
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
         path:'/Aboutus',
         element:<Aboutus></Aboutus>
      },{
           path:'/contact',
           element:<Private>
            <Contact></Contact>
           </Private>
      },
      {
        path:'/Login',
        element:<Login></Login>
      },
      {
        path:'/Singup',
        element:<SingUp></SingUp>
      },
      {path:"/Dtails/:id",
        element:<Private>
          <Dtails></Dtails>
        </Private>
      },
      {
        path:'/order',
        element:<Order></Order>
      },
      {
        path:'suspend',
        element:<Suspend></Suspend>
      }
    ],
  },
  {
    path:'dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
         index:true,
        element:<DashboardHome></DashboardHome>
      },
      {
        path:'Myprofile',
        element:<Myprofile></Myprofile>
      },
      //payment-method
      {path:'successful',
        element:<Success></Success>

      },  
       {
         path:'Cancel-pay',
         element:<Cancel></Cancel>
      },//extar-router
       {
        path:'Update/:id',
        element:<Update></Update>
       },
       {
        path:'Order-dtails/:id',
        element:<Orderdtails></Orderdtails>
       },
        //admin-routers
        {
          path:'manage-users',
          element:<Manageuser></Manageuser>
        },
        {
            path:'all-products',
            element:
              <AllProducts></AllProducts>
        },
       {
          path:'all-orders',
          element:<Allorders></Allorders>
       },
      //  manage-routers
         {
       path:'Add-product',
       element:<Addproduct></Addproduct>
      },
      {
      path:'Manage-Products',
      element:<Manageproduct></Manageproduct>
      },
      {
        path:'Pending-Orders',
        element:<Pendingorder></Pendingorder>
      },
       {
        path:'Approve-Orders',
        element:<Approveorder></Approveorder>
       },
     
       //buyer-routers
      {
        path:'My-order',
        element:<Myorder></Myorder>
       },
       {
        path:'Track-Order',
        element:<Trackorder></Trackorder>

       },
       {
        path:'Buyer-Profile',
        element:<Buyerprofile></Buyerprofile>
       },
     
    ]
  }
]);
