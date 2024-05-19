import { useEffect, useState } from "react";
import axiosClient from "../../axios-clint";
import { useStateContext } from "../../context/ContextProvider";




function SelectUser() {
  
  const { user } = useStateContext()
  const [userx, setUserx] = useState([])
  
  
  useEffect(() => {
    axiosClient
    .get('/authuser')
      .then((data)=>{
        setUserx(data.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  , []);


    

    return (
        <>
        <pre>{JSON.stringify(user)}</pre>
        <hr />
        <pre>{JSON.stringify(userx)}</pre>
        <h1>test </h1>
        </>
    )
}

export default SelectUser
