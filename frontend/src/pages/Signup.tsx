import  { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import Loading from '../components/Loading';

function Signup() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8080/customer/register", user);
      console.log("signup success", response.data);

      toast.success("User Registered Successfully", {
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
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error('Invalid input', {
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

      console.log("SIGNUP FAILED");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#f5e6cc] min-h-screen flex items-center justify-center font-P2P">
      <div className="bg-[#E5CA95] border-[4px] border-[#66422A] shadow-[6px_6px_0px_#66422A] px-10 py-12 w-[360px]">
        <h1 className="text-center text-[24px] mb-10 tracking-widest">
          SIGN UP
        </h1>

        <label className="text-[10px] mb-2 block">NAME</label>
        <input
          className="w-full mb-6 px-3 py-2 bg-[#A4BE7B] border-[3px] border-[#201E1F] text-[#1a1a1a] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px]"
          type="text"
          placeholder="Enter name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label className="text-[10px] mb-2 block">PASSWORD</label>
        <input
          className="w-full mb-8 px-3 py-2 bg-[#A4BE7B] border-[3px] border-[#201E1F] text-[#1a1a1a] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px]"
          type="password"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <div className="flex justify-center">
          <button
            onClick={onSignup}
            className="bg-[#423C3C] text-[#E9E1D4] px-6 py-2 border-[3px] border-[#201E1F] shadow-[3px_3px_0px_#201E1F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            SIGN UP
          </button>
        </div>

        <div className="text-center mt-8 text-[10px]">
          <p>
            Already have an account?
            <NavLink to="/" className="ml-2 underline text-[#201906]">
              LOGIN
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;