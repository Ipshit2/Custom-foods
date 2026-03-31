import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import CategoryCard from '../components/ui/CategoryCard';
import Heading from '../components/ui/Heading';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5e6cc] min-h-screen font-P2P text-[#66422A]">
      <Navbar />
      <div className="mx-[250px]">
        <div className=" mt-[30px]">
          <Heading title=">> SELECT YOUR FOOD <<" />
        </div>
        <div className=" mt-[20px] grid grid-cols-3 gap-8">
          <CategoryCard title="PIZZA" description="Build your own custom pizza" isActive>
            <Button size='md' onClick={() => navigate("/pizza")}>
              ORDER NOW
            </Button>
          </CategoryCard>
          <CategoryCard title="BURGERS" description="Coming Soon"/>
          <CategoryCard title="DRINKS" description="Coming Soon"/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;