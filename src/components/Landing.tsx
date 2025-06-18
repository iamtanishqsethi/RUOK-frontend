import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useNavigate} from "react-router-dom";


const Landing=()=>{

    const navigate = useNavigate();
    return (
        <div className={'flex flex-col items-center justify-center h-screen'}>
            Landing
            <InteractiveHoverButton
                onClick={()=>navigate('/login')}
            >
                Get Started
            </InteractiveHoverButton>
        </div>
    )
}
export default Landing