import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import Main from "../components/Main";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
/* import LoginPage from "../LoginPage";
import UsersList from "../UsersList";
import TodosListItem from "../TodosListItem"; */

const RouterPage = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Main}/>
      <Route path="/register" Component={SignUp}/>
      <Route path="/login" Component={SignIn} />
      </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage