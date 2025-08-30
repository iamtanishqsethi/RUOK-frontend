import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {useNavigate} from "react-router-dom";
import {type ChangeEvent, useState} from "react";
import {useTheme} from "@/components/theme-provider.tsx";
import {MagicCard} from "@/components/magicui/magic-card.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useDispatch} from "react-redux";
import {toast} from "sonner";
import  axios from "axios";
import {BASE_URL} from "@/utils/constants.ts";
import {addUser} from "@/utils/slice/userSlice.ts";
import {Mail, Lock, UserRound, HeartHandshake} from "lucide-react"
import Header from "@/components/Header.tsx";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import mixpanelService from "@/services/MixpanelService.ts";

const Login=()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [tabValue,setTabValue]=useState<string>("login")
    const [emailId,setEmailId]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const [firstName,setFirstName]=useState<string>("")
    const [message,setMessage]=useState<string>("")
    const [isLoading,setIsLoading]=useState<boolean>(false)

    const handleGoogleLogin=async (credentialResponse: any)=>{
        try{
            setIsLoading(true);
            const response=await axios.post(`${BASE_URL}/auth/google-auth`,{credential: credentialResponse.credential},{withCredentials:true})
            dispatch(addUser(response?.data?.user));
            if(response?.data?.isNewUser){
                navigate('/main/profile')
                toast.message("SignUp successful!",{
                    description:"Add Your Api Key to Unlock all features ✨"
                })
            }
            else{
                navigate('/main');

                toast.success("Google login successful!");
            }

        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err);
                toast.error(err.response?.data.message || err.message);
            } else {
                toast.error("Internal server error");
            }
        } finally {
            setIsLoading(false);
        }
    }



    const handleLogin=async ()=>{
        try{
            setIsLoading(true);
            const response=await axios.post(`${BASE_URL}/auth/login`,
                {
                    email:emailId,
                    password:password,
                },
                {withCredentials:true},
            )
            dispatch(addUser(response?.data?.user))
            navigate('/main')
            toast.success("Login successful!")
        }
        catch (err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data.message|| err.message)
            } else {
                toast.error("Internal server error");
            }
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleGuestLogin=async ()=>{
        try {
            mixpanelService.trackButtonClick('Guest Login', { location: 'Login Page' });
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/auth/guest-login`, null, {withCredentials: true},)
            dispatch(addUser(response?.data?.user))
            navigate('/main')
            toast.info('Guest Login , Limited 2 min session')
        }
        catch (err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data.message|| err.message)
            } else {
                toast.error("Internal server error");
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleSignUp=async ()=>{
        try{
            setIsLoading(true);
            const response=await axios.post(`${BASE_URL}/auth/signup`,
                {
                    email:emailId,
                    password:password,
                    firstName:firstName
                },
                {withCredentials:true},
            )
            dispatch(addUser(response?.data?.user))
            navigate('/main/profile')
            toast.message("SignUp successful!",{
                description:"Add Your Api Key to Unlock all features ✨"
            })


        }
        catch(err){
            setMessage("SignUp successful!")
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data.message||err.message)
            } else {
                toast.error("Internal server error");
            }
        }
        finally {
            setIsLoading(false);
        }
    }


    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className={'flex flex-col items-center justify-center space-y-8 h-screen pt-20 font-secondary'}>
            <Header/>
            <Tabs value={tabValue} onValueChange={setTabValue} className="w-[380px] md:w-[400px] font-secondary">
                <TabsContent value="login">
                    <Card className={'p-0'}>
                        <MagicCard className={'w-full h-full py-8'} gradientColor={theme === "dark" ? "#252525" : "#D9D9D955"}>
                            <CardHeader className={'flex flex-col items-center justify-center mb-12'} >
                                <HeartHandshake className={'h-10 w-10'}/>
                                <CardTitle className={'text-3xl font-medium font-mynabali-serif'}>Login</CardTitle>
                                <CardDescription>
                                    Enter your email and password to login
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative">
                                <Input
                                    className={'my-6 rounded-full p-5'}
                                    id="email"
                                    type={"email"}
                                    value={emailId}
                                    placeholder={"Enter your email"}
                                    onChange={(e:ChangeEvent<HTMLInputElement>) => setEmailId(e.target.value)}
                                />
                                    <Mail className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                <div className="relative">
                                <Input
                                    className={'my-6 rounded-full p-5'}
                                    id="password"
                                    type={"password"}
                                    value={password}
                                    placeholder={"Enter your password"}
                                    onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                                    <Lock className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>

                                <CardDescription>
                                    {message}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className={'my-4 flex flex-col items-center justify-center'}>
                                <InteractiveHoverButton
                                    onClick={handleLogin}
                                    className={'w-full '}
                                    disabled={isLoading}
                                >
                                    {isLoading?'Loading...':'Login'}
                                </InteractiveHoverButton>

                                <div className={'mt-4 '}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        theme={'filled_black'}
                                        shape={'pill'}
                                        onError={() => {
                                            toast.error('Google login failed');
                                        }}
                                        useOneTap

                                    />
                                </div>


                                <CardDescription
                                    onClick={handleGuestLogin}
                                    className={' font-medium mt-4 cursor-pointer hover:underline'}>
                                    Login as Guest ?
                                </CardDescription>
                            </CardFooter>
                        </MagicCard>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card className={'p-0'}>
                        <MagicCard className={'w-full h-full py-8'} gradientColor={theme === "dark" ? "#252525" : "#D9D9D955"}>
                            <CardHeader className={'flex flex-col items-center justify-center mb-8'}>
                                <HeartHandshake className={'h-10 w-10'}/>
                                <CardTitle className={'text-3xl font-medium font-mynabali-serif'}>Sign Up</CardTitle>
                                <CardDescription>
                                    Create your account to get started
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative">
                                <Input
                                    className={'my-6 rounded-full p-5'}
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    placeholder={"Enter your first name"}
                                    onChange={(e:ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                />
                                    <UserRound className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                <div className="relative">
                                <Input
                                    className={'my-6 rounded-full p-5'}
                                    id="email"
                                    type="email"
                                    value={emailId}
                                    placeholder={"Enter your email"}
                                    onChange={(e:ChangeEvent<HTMLInputElement>) => setEmailId(e.target.value)}
                                />
                                    <Mail className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                <div className="relative">
                                <Input
                                    className={'my-6 rounded-full p-5'}
                                    id="password"
                                    type={"password"}
                                    value={password}
                                    placeholder={"Create a password"}
                                    onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                                    <Lock className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>

                                <CardDescription className={'text-sm mt-4'}>
                                    Password Should contain :
                                    <ul>
                                        <li>At least 6 characters </li>
                                        <li>1 Uppercase</li>
                                        <li>1 Number</li>
                                        <li>1 Special Character</li>
                                    </ul>
                                </CardDescription>

                                {message && (
                                    <CardDescription className={'text-sm'}>
                                        {message}
                                    </CardDescription>
                                )}
                            </CardContent>
                            <CardFooter className={'my-4'}>
                                <InteractiveHoverButton
                                    onClick={handleSignUp}
                                    className={'w-full'}
                                    disabled={isLoading}
                                >
                                    {isLoading?'Loading...':'Sign Up'}
                                </InteractiveHoverButton>
                            </CardFooter>
                        </MagicCard>
                    </Card>
                </TabsContent>
                <TabsList className="grid w-full grid-cols-2 rounded-full ">
                    <TabsTrigger
                        value="login"
                        className={'rounded-full'}
                    >
                        Login
                    </TabsTrigger>
                    <TabsTrigger
                        className={'rounded-full'}
                        value="signup">Sign Up</TabsTrigger>
                </TabsList>
            </Tabs>

        </div>
        </GoogleOAuthProvider>
    )
}
export default Login