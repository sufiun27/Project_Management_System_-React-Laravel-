import { Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'

function GuestLayout() {
    const { token, notification } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }
    return (
        <div>
            
            {/* <div>Guest layout</div> */}

            <Outlet />
           
            {notification &&
            <div className='flex justify-end '>
                <p className='bg-green-500 p-5 rounded-md m-5'>{notification}</p>
            </div>
            }
        
        </div>
    )
}

export default GuestLayout
