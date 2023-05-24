import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, { useState } from 'react'
import Main from "../components/Main";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const RouterPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onRegister = (formData) => {
    // Registration code goes here
    console.log(formData);
    setIsLoggedIn(true);
  };

  const onLogin = (formData) => {
    // Login code goes here
    console.log(formData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Main}/>
      <Route path="/register" Component={SignUp} onRegister={onRegister}/>
      <Route path="/login" Component={Login} onLogin={onLogin} />
      <Route path="/main" element={isLoggedIn ? <Main /> : <Navigate to="/" />} />
      </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage