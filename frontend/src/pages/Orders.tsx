import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
function Orders() {
    
  return (
    <div className='bg-[#EEDEC4] text-[#66422A] h-screen w-full font-P2P'>
        <Navbar name="Dashboard" />
        <div className='flex justify-center items-center bg-[#423C3C] border-[black] border-2 text-[#E9E1D4] rounded-t-3xl rounded-b-sm mx-[140px] mt-[30px] mb-[5px]'>
            <h1 className='my-[18px] text-[15px] '>CHECK YOUR ORDERS!!</h1>
        </div>
        <div className='mx-[140px] bg-[#E5CA95] border-[#66422A] border-4 p-[30px] rounded-sm'>

        </div>
    </div>
  )
}

export default Orders