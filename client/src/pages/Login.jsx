
import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {FormField,Loader} from "../components"
import {useDispatch,useSelector} from "react-redux"
import { login, googleLogin} from '../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GoogleLogin} from "react-google-login"
import { gapi } from 'gapi-script'


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form,setform] = useState({
    email:"",
    password:""
  })
  const googleID = '837039216159-rr4tek7rr7sl6fbiquo0sdtrbom2df8s.apps.googleusercontent.com'
  const {loading,error} = useSelector((state) => ({...state.auth}))

  const handleChange = (e) =>{
    setform({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(form.email && form.password){
      dispatch(login({form,navigate,toast}))
    }
  }
  const googleSuccess = async(res) =>{
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const token = res?.tokenId;
    const googleId = res?.googleId;
    const dp = res?.profileObj?.imageUrl;
    const result = {email,name,token,googleId,dp};
    await dispatch(googleLogin({result,toast})).unwrap()
    navigate('/')
  }

  const googleFaliure = (err) =>{
    console.log(err);
  }

  useEffect(()=>{
    error && toast.error(error)
  },[error])
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleID,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
  return (
    <section className="max-w-7xl mx-auto">
    
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">SignIn</h1>
      </div>

      <form className="mt-8 max-w-xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
        <FormField
            LabelName="Your email"
            type="text"
            name="email"
            placeholder="abc@gmail.com"
            value={form.email}
            handleChange={handleChange}
          />
        <FormField
            LabelName="Your password"
            type="text"
            name="password"
            placeholder="1234"
            value={form.password}
            handleChange={handleChange}
          />
          <button className="flex text-[14px] justify-end">
          Forget password</button>
            <button type='submit'
             className="bg-blue-600 text-white  w-full
             sm:w-auto text-center rounded-md text-md
              font-medium px-5 py-2.5 ">
              {loading ? <Loader/> : "Login"}
            </button>

          <GoogleLogin
            clientId = {googleID}
            render={(renderProps) => (
              <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="bg-red-600 text-white  w-full
             sm:w-auto text-center rounded-md text-md
              font-medium px-5 py-2.5 ">
              Signin with Google
            </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFaliure}
            cookiePolicy="single_host_origin"
          />
            <Link to="/sign-up" className="text-center text-blue-600">Dont have an account? SignUp</Link>
        </div>
      </form>
      <ToastContainer/>
    </section>
  )
}

export default Login