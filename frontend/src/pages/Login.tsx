import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Music from '../components/Music';
import Music1 from '../assets/Music1.mp3'
import { NavLink, useNavigate  } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from "axios"
import KeyboardSound from '../components/KeyboardSound';

function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [user,setUser] = useState({
    name: "",
    password:"",
  })
  const onLogin = async()=>{
    try {
      const response = await axios.post("http://localhost:8080/user/login",user)
      console.log("login success", response.data);
      const { token } = response.data
      document.cookie = `token=${token}; path=/; max-age=3600`
      toast.success("Successfully Logged in",{
        style:{
          border: '3px solid #66422A',
          color: '#66422A',
          backgroundColor: '#E5CA95',
          padding: '20px',
          fontFamily: '"Press Start 2P", system-ui',
          fontSize: '10px'
        },
        iconTheme:{
          primary: '#5c6a46',
          secondary:'#201E1F',
        }
      })
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error('An error happened. Put proper information',{
        style:{
          border: '3px solid #66422A',
          color: '#66422A',
          backgroundColor: '#E5CA95',
          padding: '20px',
          fontFamily: '"Press Start 2P", system-ui',
          fontSize: '10px'
        },
        iconTheme:{
          primary: '#5c6a46',
          secondary:'#201E1F',
        }
      });
      console.log("Login FAILED");
      
    }
  }


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
    
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className='bg-[#EEDEC4] text-[#66422A] h-screen w-full flex justify-center items-center font-P2P'>
      {/* Background Music Component */}
      {/* <KeyboardSound/>
      <Music musicSrc={Music1}  /> */}
      
      
      <div className=' border-[#66422A] bg-[#E5CA95]  border-[10px] rounded-xl px-[70px] py-[100px] w-auto h-auto'>
      
        <div className='flex justify-center items-center'>
          <h1 className=' text-[50px] pb-[70px]'>LOGIN</h1>
        </div>

        <h1 className='text-[18px] pb-[10px] w-[200px]'>NAME:</h1>
        <input 
          className='text-[#201906] rounded-md w-[400px] text-[15px] bg-[#5c6a46] h-[40px] pl-[4px] border-[#201E1F] border-[3px] mb-[50px]' 
          id='name'
          type="text"
          placeholder='Enter Your Name'
          value={user.name}
          onChange={(e) => setUser({...user, name: e.target.value})}
      
        />

        <h1 className='text-[18px] pb-[10px] w-[200px]'>PASSWORD:</h1>
        <input 
          className='text-[#201906] rounded-md w-[400px] text-[15px] bg-[#5c6a46] h-[40px] pl-[4px] border-[#201E1F] border-[3px] mb-[50px]' 
          id='password'
          type="password" 
          placeholder='Enter Your Password'
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
        
        />
        <div className='flex justify-center items-center text-[#E9E1D4]'>
          <button className= 'rounded-lg border-[#201E1F] border-[4px] bg-[#423C3C] p-[7px] px-[25px]' onClick={onLogin}
          >LOGIN</button>
        </div>
        <h1 className='pt-[20px] text-[12px]'>Don't have an Account? 
          <NavLink to='/signup' className='pl-2 text-[#201906]'>
                  SignUp
          </NavLink>
          </h1>
      </div>
    </div>
  );
}

export default Login;
