import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useNavigate} from "react-router-dom";
import {type ChangeEvent, useState} from "react";
import {useTheme} from "@/components/theme-provider.tsx";
import {MagicCard} from "@/components/magicui/magic-card.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useDispatch} from "react-redux";
import {toast} from "sonner";
import  axios from "axios";
import {BASE_URL} from "@/components/utils/constants.ts";
import {addUser} from "@/components/utils/userSlice.ts";

const Login=()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [tabValue,setTabValue]=useState<string>("login")
    const [emailId,setEmailId]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const [firstName,setFirstName]=useState<string>("")
    const [message,setMessage]=useState<string>("")

    const handleLogin=async ()=>{
        try{
            const response=await axios.post(`${BASE_URL}/api/auth/login`,
                {
                    email:emailId,
                    password:password,
                },
                {withCredentials:true},
            )
            dispatch(addUser(response?.data?.user))
            navigate('/dashboard')
            toast.success("Login successful!")
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

    const handleSignUp=async ()=>{
        try{
            const response=await axios.post(`${BASE_URL}/api/auth/signup`,
                {
                    email:emailId,
                    password:password,
                    firstName:firstName
                },
                {withCredentials:true},
            )
            dispatch(addUser(response?.data?.user))
            navigate('/profile')
            toast.message("SignUp successful!",{
                description:"Complete Profile Details "
            })


        }
        catch(err){
            setMessage("SignUp successful!")
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data || "Signup failed");
            } else {
                toast.error("Internal server error");
            }
        }
    }


    return (
        <div className={'flex flex-col items-center justify-center space-y-8 h-screen pt-20'}>

            <Tabs value={tabValue} onValueChange={setTabValue} className="w-[380px] md:w-[400px]">
                <TabsContent value="login">
                    <Card className={'p-0'}>
                        <MagicCard className={'w-full h-full  py-10'} gradientColor={theme === "dark" ? "#252525" : "#D9D9D955"}>
                            <CardHeader >
                                <CardTitle className={'text-2xl font-medium '}>LogIn</CardTitle>
                                <CardDescription>
                                    Log back into your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className={'text-lg'}>Email</Label>
                                    <Input
                                        id="email"
                                        type={"email"}
                                        value={emailId}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => setEmailId(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className={'text-lg'}>Password</Label>
                                    <Input
                                        id="password"
                                        type={"password"}
                                        value={password}
                                        onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    />
                                </div>
                                <CardDescription>
                                    {message}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <InteractiveHoverButton
                                    onClick={handleLogin}
                                    className={'w-full '}
                                >
                                    Login
                                </InteractiveHoverButton>
                            </CardFooter>
                        </MagicCard>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card className={'p-0'}>
                        <MagicCard className={'py-10'} gradientColor={theme === "dark" ? "#252525" : "#D9D9D955"}>
                            <CardHeader>
                                <CardTitle className={'text-2xl font-medium '}>SignUp</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3.5">
                                <div className="space-y-1.5">
                                    <Label htmlFor="firstName" className={'text-lg'}>First Name</Label>
                                    <Input id="firstName"
                                           type="text"
                                           value={firstName}
                                           onChange={(e:ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className={'text-lg'}>Email</Label>
                                    <Input id="email"
                                           type="email"
                                           value={emailId}
                                           onChange={(e:ChangeEvent<HTMLInputElement>) => setEmailId(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="password" className={'text-lg'}>Password</Label>
                                    <Input id="password"
                                           type={"password"}
                                           value={password}
                                           onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    />
                                </div>
                                <CardDescription>
                                    Password Should contain :
                                    <ul>
                                        <li>Atleast 6 characters </li>
                                        <li>1 Uppercase</li>
                                        <li>1 Number</li>
                                        <li>1 Special Character</li>
                                    </ul>
                                </CardDescription>
                                <CardDescription>
                                    {message}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <InteractiveHoverButton
                                    onClick={handleSignUp}
                                    className={'w-full '}
                                >SignUp
                                </InteractiveHoverButton>
                            </CardFooter>
                        </MagicCard>
                    </Card>
                </TabsContent>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">SignUp</TabsTrigger>
                </TabsList>
            </Tabs>

        </div>
    )
}
export default Login