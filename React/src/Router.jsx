import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'

import Login from './views/Login'
import Signup from './views/Signup'
import NotFound from './views/NotFound'
import Users from './views/Users'
import Logout from './views/Logout'
import Addnew from './views/Addnew'
import Edituser from './views/Edituser'



function Router() {
   
    const router = createBrowserRouter([

        {path:'/', element: <DefaultLayout />, children:[
            {path:'/', element: <Navigate to='/users' />},
            {path:'/users', element: <Users/>},
            {path:'/logout', element: <Logout />},
            {path:'/addnew', element: <Addnew />},
            {path: '/edituser/:userId', element: <Edituser />}
        ]},


        {path:'/', element: <GuestLayout />, children:[
            {path:'/login', element: <Login />},
            {path:'/signup', element: <Signup />},
        ]},

        
        {path:'*', element: <NotFound />},
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Router




