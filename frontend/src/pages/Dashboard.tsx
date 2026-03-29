import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5e6cc] min-h-screen font-P2P text-[#66422A]">
      <Navbar />
      <div className="mx-[100px] mt-[30px]">
        <div className="bg-[#423C3C] text-[#E9E1D4] border-[3px] border-[#201E1F] shadow-[4px_4px_0px_#201E1F] text-center py-3">
          <h1 className="text-[14px] tracking-widest">
            &gt;&gt; SELECT YOUR FOOD &lt;&lt;
          </h1>
        </div>
      </div>
      <div className="mx-[100px] mt-[20px] grid grid-cols-3 gap-8">
        <div className="bg-[#E5CA95] border-[4px] border-[#66422A] shadow-[6px_6px_0px_#66422A] p-6 text-center">

          <h2 className="text-[12px] mb-4">PIZZA</h2>

          <p className="text-[10px] mb-6">
            Build your own custom pizza
          </p>

          <button
            onClick={() => navigate("/pizza")}
            className="bg-[#423C3C] text-[#E9E1D4] px-5 py-2 border-[3px] border-[#201E1F] shadow-[3px_3px_0px_#201E1F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            CUSTOMIZE
          </button>
        </div>
        
        <div className="bg-[#E5CA95] border-[4px] border-[#66422A] p-6 text-center opacity-60">
          <h2 className="text-[12px] mb-4">BURGERS</h2>
          <p className="text-[10px]">Coming Soon</p>
        </div>

        <div className="bg-[#E5CA95] border-[4px] border-[#66422A] p-6 text-center opacity-60">
          <h2 className="text-[12px] mb-4">DRINKS</h2>
          <p className="text-[10px]">Coming Soon</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;