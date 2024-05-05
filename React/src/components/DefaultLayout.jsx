import { Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'
import axiosClient from '../axios-clint';
import Navbar from './Navbar';

function DefaultLayout() {
    const {user, token, setUser, setToken, notification, setNotification} = useStateContext();
    const currentUser = localStorage.getItem('USER');
    if(!token){
        return <Navigate to="/login"/>
    }
    
    return (
        <div>
            <Navbar />

            {/* <div>Default layout</div> */}
            <Outlet />
            
            {notification &&
            <div className="notification">
                {notification}
            </div>
            }
        </div>
    )
}

export default DefaultLayout
