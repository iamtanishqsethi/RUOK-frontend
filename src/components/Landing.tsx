import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useNavigate} from "react-router-dom";
import Header from "@/components/Header.tsx";


const Landing=()=>{

    const navigate = useNavigate();

    return (
        <div className={'flex flex-col items-center justify-center h-screen'}>
            <Header/>
            Landing
            <InteractiveHoverButton
                onClick={()=>navigate('/main')}
            >
                Get Started
            </InteractiveHoverButton>
        </div>
    )
}
export default Landing