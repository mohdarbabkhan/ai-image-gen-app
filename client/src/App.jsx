import React from 'react'
import { BrowserRouter, Link, Routes,Route } from 'react-router-dom'
import { CreatePost,Home } from './pages'
import Logo from "./assets/logo.svg"
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center
      sm:px-8 px-4 py-4 border-b-[#e6ebf4] border-b bg-white" >
        <Link to='/'>
          <img className="w-28 object-contain" src={Logo} alt='logo'/>
        </Link>

        <Link to='/create-post' className="bg-[#6469ff] px-4 py-2 text-white
        rounded-md">
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full
      bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="create-post" element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App