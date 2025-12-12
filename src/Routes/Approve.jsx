import React, { use } from 'react';
import { AuthContex } from '../Providers/AuthContex';
import useStatus from '../Hooks/useStatus';
import Loading from '../Extra/Loading';
import Myprofile from '../Pages/DashboardPages/Myprofile/Myprofile';

const Approve = ({children}) => {
    const {loader}=use(AuthContex)
   const {isLoading,status}=useStatus()
      if(loader || isLoading){
        return <Loading></Loading>
      }
   if(status !=="approve")
    return <Myprofile></Myprofile>

    return children
};

export default Approve;




