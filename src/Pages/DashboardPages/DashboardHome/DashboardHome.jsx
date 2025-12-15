import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Extra/Loading';
import Admin from '../../../components/Dashbord/Admin/Admin';
import Buyers from '../../../components/Dashbord/Buyer/Buyers';
import Manag from '../../../components/Dashbord/Manage/Manag';

const DashboardHome = () => {
  const {isLoading,role}=useRole();
      if(isLoading){
        return <Loading></Loading>
      }
     if(role =="admin"){
        return <Admin></Admin>
     }
      if(role=="buyer"){
        return <Buyers></Buyers>
     }
      else{
        return <Manag></Manag>
      }
};

export default DashboardHome;