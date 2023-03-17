import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../assets'
import {useDispatch,useSelector} from 'react-redux'
import { setLogout } from '../redux/features/authSlice'

const Header = () => {
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const handleLogout = () =>{
      dispatch(setLogout())
    }
    
  return (
    <header className="w-full flex justify-between items-center
      sm:px-8 px-4 py-4 border-b-[#e6ebf4] border-b bg-white" >
        <Link to='/'>
          <img className="w-28 object-contain" src={logo} alt='logo'/>
        </Link>
        <div className="flex gap-3">
        {user?.result?._id ? (
        <>
        <img class="w-10 h-10 rounded-full" src={user?.result.dp} alt={user?.result.name.charAt(0)}/>
        <h5 className="font-bold text-sm items-center flex">{user?.result?.name}</h5>
        <Link to='/create-post' className="bg-[#6469ff] px-4 py-2 text-white
        rounded-md">
          Create
        </Link>
        <Link to='/sign-in' onClick={handleLogout} 
        className="bg-transparent lg:px-4 xs:px-2 py-2 font-bold text-black
        rounded-md">
          Logout
        </Link>
        </>
        ):(
        <>
        <Link to='/sign-in' className="lg:px-4 sm:px-2 py-2 text-black
        rounded-md bg-transparent">
          Login
        </Link>

        <Link to='/sign-up' className="bg-transparent lg:px-4 xs:px-2 py-2 text-black
        rounded-md">
          Register
        </Link>
        </>
        )}
        </div>
        
      </header>
  )
}

export default Header