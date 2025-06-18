
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import useFetchUser from "@/components/utils/useFetchUser.ts";



const Body = () => {
    const fetchUser=useFetchUser()
    useEffect(() => {
        fetchUser();
    }, []);
    return (
    <>
        <Outlet/>
    </>
  )
}

export default Body
