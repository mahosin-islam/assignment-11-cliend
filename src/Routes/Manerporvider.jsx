import React, { use } from 'react';
import { AuthContex } from '../Providers/AuthContex';
import Loading from '../Extra/Loading';
import useRole from '../Hooks/useRole';
import ErrorPage from '../Extra/Errorpage';

const Manerporvider = ({children}) => {
    const {loader}=use(AuthContex)
   const {isLoading,role}=useRole()
      if(loader || isLoading){
        return <Loading></Loading>
      }
   if(role !=="manager")
    return <ErrorPage></ErrorPage>

    return children
};

export default Manerporvider;

