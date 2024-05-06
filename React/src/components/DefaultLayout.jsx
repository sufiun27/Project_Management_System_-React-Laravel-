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

            {notification &&
            <div className='flex justify-end '>
                <p className='bg-green-500 p-5 rounded-md m-5'>{notification}</p>
            </div>
            }

            {/* <div>Default layout</div> */}
            <Outlet />
            
            
        </div>
    )
}

export default DefaultLayout
