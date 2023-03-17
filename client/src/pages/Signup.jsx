import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {FormField,Loader} from "../components"
import {useDispatch,useSelector} from "react-redux"
import { register,googleLogin } from '../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'
import {GoogleLogin} from "react-google-login"
import { gapi } from 'gapi-script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const googleID = '837039216159-rr4tek7rr7sl6fbiquo0sdtrbom2df8s.apps.googleusercontent.com'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error} = useSelector((state) => state.auth)
  const [form,setform] = useState({
    fname:"",
    lname:"",
    email:"",
    password:"",
    cpassword:""
  })

  const handleChange = (e) => {
    setform({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i am clicked");
    if(form.password != form.cpassword) return toast.error("passwords should match!")
    if(form.email && form.password && form.cpassword && form.fname && form.lname){
      dispatch(register({form,navigate,toast}))
    }
  }

  const googleSuccess = (res) =>{
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const token = res?.tokenId;
    const googleId = res?.googleId;
    const result = {email,name,token,googleId};
    dispatch(googleLogin({result,toast,navigate}))
  }

  const googleFaliure = (err) =>{
    console.log(err);
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleID,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  useEffect(()=>{
    error && toast.error(error)
  },[error])

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">SignUp</h1>
      </div>

      <form className="mt-8 max-w-xl p-2" onSubmit={handleSubmit}>
        <div className="flex gap-12 mb-5">
        <FormField
            LabelName="first name"
            type="text"
            name="fname"
            placeholder="john"
            value={form.fname}
            handleChange={handleChange}
          />
        <FormField
            LabelName="last name"
            type="text"
            name="lname"
            placeholder="doe"
            value={form.lname}
            handleChange={handleChange}
          />
          </div>
        <div className="flex flex-col gap-5">
        <FormField
            LabelName="email"
            type="text"
            name="email"
            placeholder="abc@gmail.com"
            value={form.email}
            handleChange={handleChange}
          />
        <FormField
            LabelName="password"
            type="text"
            name="password"
            placeholder="****"
            value={form.password}
            handleChange={handleChange}
          />
        <FormField
            LabelName="confirm password"
            type="text"
            name="cpassword"
            placeholder="****"
            value={form.cpassword}
            handleChange={handleChange}
          />
  
            <button type='submit' className="bg-blue-600 text-white  w-full
             sm:w-auto text-center rounded-md text-md
              font-medium px-5 py-2.5 ">
              {loading ? <Loader/> : "SignUp"}
            </button>

            <GoogleLogin
            clientId={googleID}
            render={(renderProps) => (
              <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="bg-red-600 text-white  w-full
             sm:w-auto text-center rounded-md text-md
              font-medium px-5 py-2.5 ">
              SignUp with Google
            </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFaliure}
            cookiePolicy="single_host_origin"
          />
            <Link to="/sign-in" className="text-center text-blue-600">
            Already SignedUp? Login</Link>
        </div>
      </form>
      <ToastContainer/>
    </section>
  )
}

export default Signup