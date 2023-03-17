
import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Link, Routes,Route } from 'react-router-dom'
import { CreatePost,Home,Login,Signup } from './pages'
import Header from './constants/Header'
import { useDispatch} from 'react-redux'
import { setUser} from './redux/features/authSlice'
import PrivateRoute from './pages/privateRoute'

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))

    useEffect(() =>{
      dispatch((setUser(user)));
    },[])
  return (
    <BrowserRouter>
      <Header/>
      <main className="sm:p-8 px-4 py-8 w-full
      bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="create-post" element={<PrivateRoute><CreatePost/></PrivateRoute>}/>
          <Route path="sign-in" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App