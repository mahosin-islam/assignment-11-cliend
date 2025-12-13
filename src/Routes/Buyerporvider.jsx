import React, { use } from 'react';
import { AuthContex } from '../Providers/AuthContex';
import Loading from '../Extra/Loading';
import useRole from '../Hooks/useRole';
import ErrorPage from '../Extra/Errorpage';

const Buyerporvider = ({children}) => {
    const {loader}=use(AuthContex)
   const {isLoading,role}=useRole()
      if(loader || isLoading){
        return <Loading></Loading>
      }
   if(role !=="buyer")
    return <ErrorPage></ErrorPage>

    return children
};

export default Buyerporvider;



