import {Link} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";
import axios from "axios";
import {toast} from "sonner";
import {BASE_URL} from "@/components/utils/constants.ts";
import {useDispatch} from "react-redux";
import {removeUser} from "@/components/utils/userSlice.ts";

const Header=()=>{

    const dispatch = useDispatch()

    const handleLogOut=async ()=>{
        try{
            await axios.post(`${BASE_URL}/api/auth/logout`,null,{withCredentials:true})
            dispatch(removeUser())
            toast.success("User logged out successfully");
        }
        catch (err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data || "Signup failed");
            } else {
                toast.error("Internal server error");
            }
        }
    }

    return (
        <div className={' fixed top-0 flex items-center justify-between px-10 py-5 z-10 shadow  shadow-zinc-200 dark:shadow-zinc-800 w-screen'}>
            <Link to={'/'}>Ru-Ok</Link>
            <div className={'flex items-center justify-center space-x-5'}>
                <ModeToggle/>
                <Button onClick={handleLogOut}>LogOut</Button>
            </div>

        </div>
    )
}
export default Header