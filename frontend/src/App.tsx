import { Outlet } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
function App() {
  

  return (
    <>
    <Outlet/>
    <Toaster position="top-center" reverseOrder={false}/>
    </>
  )
}

export default App
