import { useEffect, useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from "axios"
import Loading from '../components/Loading';
import Button from '../components/ui/Button';
function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [user,setUser] = useState({
    name: "",
    password:"",
  })
  const onLogin = async()=>{
    try {
      const response = await axios.post("http://localhost:8080/customer/login",user)
      console.log("login success", response.data);

      const { token } = response.data;
      document.cookie = `token=${token}; path=/; max-age=3600`;

      toast.success("Successfully Logged in", {
        style: {
          border: '3px solid #66422A',
          color: '#66422A',
          backgroundColor: '#E5CA95',
          padding: '16px',
          fontFamily: '"Press Start 2P", system-ui',
          fontSize: '10px'
        },
        iconTheme: {
          primary: '#5c6a46',
          secondary: '#201E1F',
        }
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      toast.error('Invalid credentials', {
        style: {
          border: '3px solid #66422A',
          color: '#66422A',
          backgroundColor: '#E5CA95',
          padding: '16px',
          fontFamily: '"Press Start 2P", system-ui',
          fontSize: '10px'
        },
        iconTheme: {
          primary: '#5c6a46',
          secondary: '#201E1F',
        }
      })
      console.log("Login FAILED");
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  

  return (
    <div className="bg-[#f5e6cc] min-h-screen flex items-center justify-center font-P2P">
      <div className="bg-[#E5CA95] border-[4px] border-[#66422A] shadow-[6px_6px_0px_#66422A] px-10 py-12 w-[360px]">

        <h1 className="text-center text-[24px] mb-10 tracking-widest">
          LOGIN
        </h1>
        <label className="text-[10px] mb-2 block">NAME</label>
        <input
          className="w-full mb-6 px-3 py-2 bg-[#A4BE7B]  border-[3px] border-[#201E1F] text-[#1a1a1a] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px]"
          type="text"
          placeholder="Enter name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label className="text-[10px] mb-2 block">PASSWORD</label>
        <input
          className="
            w-full mb-8 px-3 py-2 bg-[#A4BE7B] border-[3px] border-[#201E1F] text-[#1a1a1a] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px]"
          type="password"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <div className="flex justify-center">
          <Button onClick={onLogin} size="md" variant="secondary" className='w-full'>
            LOGIN
          </Button>
        </div>

        <div className="text-center mt-8 text-[10px] leading-5">
          <p>
            Don't have an account?
            <NavLink to="/signup" className="ml-2 underline text-[#201906]">
              SIGN UP
            </NavLink>
          </p>

          <div className="border-t-[2px] border-[#66422A] my-4"></div>

          <p className="text-[#5c6a46]">Demo Login:</p>
          <p>ID: <span className="text-[#201906]">one</span></p>
          <p>Password: <span className="text-[#201906]">one</span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;