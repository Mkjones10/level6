import React, { useContext, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Auth from "./components/Auth"
import Profile from "./components/Profile"
import Public from "./components/Public"
import { UserContext } from "./context/UserProvider"




function App() {

  const { token, logout } = useContext(UserContext)

  return (
    <>
      <div className = "app">
        { token && <Navbar logout = {logout}/>}
        <Routes>
          <Route exact path = "/" element = {token ? <Navigate replace to = "/profile"  /> : <Auth />} />
          <Route exact path = "/profile" element = { token ? <Profile /> : <Navigate replace to ="/" />} />
          <Route exact path = "/public" element = { token ? <Public />: <Navigate replace to = "/" /> } /> 
         </Routes>
      </div>
    </>
  )
}

export default App