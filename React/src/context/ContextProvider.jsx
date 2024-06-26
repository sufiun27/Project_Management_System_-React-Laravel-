import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-clint";
const StateContext = createContext({
    user: {},
    token: null,
    notification: null,
    setUser:()=>{},
    setToken:()=>{},
    setNotification: () => {}

});

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');

    useEffect(()=>{
        if (token) {
            axiosClient
              .get('/authuser')
              .then((data) => {
                _setUser(data.data.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
    },[])
    const setUser = () => {}
    // const setUser = (data) => {
    //     _setUser(data)
    //     if (data) {
    //       localStorage.setItem('USER', data.name);
    //     } else {
    //       localStorage.removeItem('USER');
    //     }
    // }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
          localStorage.setItem('ACCESS_TOKEN', token);
        } else {
          localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        _setNotification(message);
    
        setTimeout(() => {
          _setNotification('')
        }, 5000)
      }

    return (
        <StateContext.Provider value={{user, token, setUser, setToken, notification, setNotification}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);