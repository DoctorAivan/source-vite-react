import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

    let account =  JSON.parse(window.localStorage.getItem('account'))

    return(
        account?.logged ? 
            <Outlet/>
            :
            <Navigate to="/login"/>
    )
}

export default PrivateRoutes