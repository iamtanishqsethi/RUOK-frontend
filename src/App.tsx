import { ThemeProvider } from "@/components/theme-provider"
import Body from './components/Body'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Landing from "@/components/Landing.tsx";
import Login from "@/components/Login.tsx";
import Dashboard from "@/components/Dashboard.tsx";
import CheckIn from "@/components/CheckIn.tsx";
import Tools from "@/components/Tools.tsx";
import AiDashBoard from "@/components/AiDashBoard.tsx";
import Chat from "@/components/Chat.tsx";
import Profile from "@/components/Profile.tsx";
import {Provider} from "react-redux";
import appStore from "@/components/utils/appStore.ts";
import {Toaster} from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";

function App() {
  
    const appRouter=createBrowserRouter([
        {
            path:'/',
            element:<Body/>,
            children:[
                {
                    index:true,
                    element:<Landing/>
                },
                {
                    path:'login',
                    element:<Login/>
                },
                {
                    path:'dashboard',
                    element:<ProtectedRoute><Dashboard/></ProtectedRoute>
                },
                {
                    path:'checkin',
                    element:<ProtectedRoute><CheckIn/></ProtectedRoute>
                },
                {
                    path:'tools',
                    element:<ProtectedRoute><Tools/></ProtectedRoute>
                },
                {
                    path:'ai',
                    element:<ProtectedRoute><AiDashBoard/></ProtectedRoute>
                },
                {
                    path:'chat',
                    element:<ProtectedRoute><Chat/></ProtectedRoute>
                },
                {
                    path:'profile',
                    element:<ProtectedRoute><Profile/></ProtectedRoute>
                }
            ]
        }
    ])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={appStore}>
            <Toaster duration={3000}/>
            <RouterProvider router={appRouter}></RouterProvider>
        </Provider>
    </ThemeProvider>
  )
}

export default App
