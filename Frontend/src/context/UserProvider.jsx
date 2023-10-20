import React, {  useEffect, useState } from 'react'
import userContext from './userContext'
import { getCurrUser, isLoggedIn } from '../Auth/Auth'
const UserProvider = ({children}) => {

    const [user,setUser] = useState({
        data:{},
        login:false
    })

    useEffect(()=>{
        setUser({
            data:getCurrUser(),
            login:isLoggedIn()
        })
    },[])

    


  return (
    <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider
