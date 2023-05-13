import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import Main from "../components/Main";
import SignUp from "../components/SignUp";
const RouterPage = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Main}/>
      <Route path="/register" Component={SignUp}/>
      </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage