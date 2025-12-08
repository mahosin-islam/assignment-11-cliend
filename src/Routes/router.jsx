import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Mainpages/Home/Home";
import Allproducts from "../Pages/Mainpages/AllProducts/Allproducts";
import Login from "../Authentication/Login";
import SingUp from "../Authentication/SingUp";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardPages/DashboardHome/DashboardHome";
import Myprofile from "../Pages/DashboardPages/Myprofile/Myprofile";
import Aboutus from "../Pages/Mainpages/Aboutus/Aboutus";
import Contact from "../Pages/Mainpages/Contact/Contact";
import Private from "./Private";

export const router = createBrowserRouter([
  {
    path: "/",
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
        path: "/Allporducts",
        element: <Allproducts></Allproducts>,
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
      }
    ]
  }
]);
