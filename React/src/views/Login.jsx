import {Link} from "react-router-dom";
import axiosClient from '../axios-clint';
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState, useEffect } from "react";

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { user, setUser, setToken, notification, setNotification } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
        setNotification('Logged in successfully')
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

 

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className=" bg-green-100 p-20 rounded-xl ">
          <form className="" onSubmit={onSubmit}>
            <p className="text-3xl font-bold  mb-10">Project Management System</p>
            <p className="">Login into your account</p>

            <br />

            {message &&
              <div className="bg-red-200 text-red-700 p-2 rounded-md">
                <p>{message}</p>
              </div>
            }

          <div className="w-full md:w-1/3">
            <input
              className=" flex h-10 w-80 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>

          <div className="mt-5 w-full md:w-1/3">
            <input
              className="flex h-10 w-80 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>

            <button className=" mt-5 rounded-md bg-green-700 px-4 py-2 text-white hover:text-black hover:bg-green-500 ">
              Login
              </button>
            <p className="message">Not registered? <Link className="text-blue-400" to="/signup">Create an account</Link></p>
          </form>

          
      </div>
    </div>
  )
}
