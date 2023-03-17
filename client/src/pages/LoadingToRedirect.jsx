import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [Count,setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() =>{
        const interval = setInterval(() =>{
            setCount((currentCount) => --currentCount);
        },1000);
        Count === 0 && navigate("/sign-in");
        return () => clearInterval(interval);
    },[Count,navigate]);
  return (
    <div>
        <h5>Redirecting you in {Count} seconds</h5>
    </div>
  )
}

export default LoadingToRedirect