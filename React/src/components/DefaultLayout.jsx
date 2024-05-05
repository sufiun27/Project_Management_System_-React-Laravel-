import { Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'
import axiosClient from '../axios-clint';

function DefaultLayout() {
    const {user, token, setUser, setToken, notification, setNotification} = useStateContext();
    
    if(!token){
        return <Navigate to="/login"/>
    }
    const onLogout = ev => {
        ev.preventDefault()
    
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
            setNotification('Logged out successfully')
          })
      }
    return (
        <div>
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
            <div>Default layout</div>
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
