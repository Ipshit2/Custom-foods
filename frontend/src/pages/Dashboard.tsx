import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Motion from '../components/Motion';
import back from '../assets/back.png';
import next from '../assets/next.png';

function Dashboard() {
    type Ingredient = {
        _id: string
        name: string
        type: string
        price: number
        image: string
    }

    const [index, setIndex] = useState(0)
    const [input, setInput] = useState<Ingredient[]>([])
    const [ingredientTypes, setIngredientTypes] = useState<string[]>([])
    const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([])

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ingredient/getall", {
                    withCredentials: true,
                })

                const fetchedData: Ingredient[] = response.data.data

                
                const uniqueTypes = [...new Set(fetchedData.map(item => item.type))]
                setInput(fetchedData)
                setIngredientTypes(uniqueTypes)

                
                updateFilteredIngredients(fetchedData, uniqueTypes[0])

            } catch (error) {
                console.error('Error fetching ingredients', error)
            }
        };
        fetchIngredients()
    }, [])

    
    const updateFilteredIngredients = (ingredients: Ingredient[], type: string) => {
        const filtered = ingredients.filter(item => item.type === type);
        setFilteredIngredients(filtered)
    }

    const handleNext = () => {
        setIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % ingredientTypes.length
            updateFilteredIngredients(input, ingredientTypes[newIndex])
            return newIndex;
        })
    }

    const handlePrev = () => {
        setIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + ingredientTypes.length) % ingredientTypes.length
            updateFilteredIngredients(input, ingredientTypes[newIndex])
            return newIndex
        })
    }

    return (
        <div className='bg-[#EEDEC4] text-[#66422A] h-screen w-full font-P2P '>
            <Navbar name="Order" />
            <div className='flex justify-center items-center bg-[#423C3C] border-[black] border-2 text-[#E9E1D4] rounded-t-3xl rounded-b-sm mx-[140px] mt-[30px] mb-[5px]'>
                <h1 className='my-[18px] text-[15px] '>CUSTOMIZE YOUR OWN PIZZA..!!</h1>
            </div>
            <div className='mx-[140px] bg-[#E5CA95] border-[#66422A] border-4 p-[30px] rounded-sm'>
                <div className='flex justify-center items-center w-full'>
                    <div className='flex justify-center w-[420px] items-center border-black border-2 rounded-lg h-auto p-[10px]'>
                        <div onClick={handlePrev} className='cursor-pointer'>
                            <img src={back} alt="" className='h-[50px] animate-bounce' />
                        </div>
                        <div className='mx-[70px] text-xl w-[150px] flex items-center justify-center text-black animate-bounce'>
                            <h1>{ingredientTypes[index] || "Loading..."}</h1>
                        </div>
                        <div onClick={handleNext} className='cursor-pointer'>
                            <img src={next} alt="" className='h-[50px] animate-bounce' />
                        </div>
                    </div>
                </div>
                
                <div className='flex '>
                    <Motion ingredients={filteredIngredients} /> 
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
