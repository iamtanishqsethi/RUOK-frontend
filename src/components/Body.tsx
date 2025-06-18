
import {Outlet} from "react-router-dom";
import Header from "@/components/Header.tsx";


const Body = () => {
  return (
    <div >
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Body
