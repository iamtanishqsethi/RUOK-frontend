import { ThemeProvider } from "@/components/theme-provider"
import Body from './components/Body'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Landing from "@/components/Landing/Landing.tsx";
import Login from "@/components/Login.tsx";
import Dashboard from "@/components/Dashboard/Dashboard.tsx";
import CheckIn from "@/components/Checkin/CheckIn.tsx";
import ToolsPage from "@/components/Tools/ToolsPage.tsx";
import AiDashBoard from "@/components/AiDash/AiDashBoard.tsx";
import Chat from "@/components/Chat/Chat.tsx";
import {Provider} from "react-redux";
import appStore from "@/utils/appStore.ts";
import {Toaster} from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import {SideBar} from "@/components/SideBar.tsx";
import Profile from "@/components/Profile/Profile.tsx";
import About from "@/components/About/About.tsx";
import { Analytics } from '@vercel/analytics/react';

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
                    path:'about',
                    element:<About/>
                },
                {
                    path:'login',
                    element:<Login/>
                },{
                    path:"main",
                    element:<ProtectedRoute><SideBar/></ProtectedRoute>,
                    children:[
                        {
                            index:true,
                            element:<ProtectedRoute><Dashboard/></ProtectedRoute>
                        },
                        {
                            path:'checkin',
                            element:<ProtectedRoute><CheckIn/></ProtectedRoute>
                        },
                        {
                            path:'tools',
                            element:<ProtectedRoute><ToolsPage/></ProtectedRoute>
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

            ]
        }
    ])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={appStore}>
            <Toaster duration={3000}/>
            <Analytics/>
            <RouterProvider router={appRouter}>
            </RouterProvider>
        </Provider>
    </ThemeProvider>
  )
}

export default App
