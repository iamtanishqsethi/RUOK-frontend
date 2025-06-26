
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import useFetchUser from "@/utils/hooks/useFetchUser.ts";



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
