
import { Children } from "react"
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import AppLayout from "./Layout/AppLayout"
import LandingPage from "./pages/LandingPage"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Link from "./pages/Link"
import RedirectLink from "./pages/RedirectLink"
import UrlProvider from "./context"
import RequireAuth from "./components/RequireAuth"

const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/dashboard',
        element:(
          <RequireAuth>
        <Dashboard/>
          </RequireAuth>
      )
      },
      {
        path:'/link/:id',
        element:(
          <RequireAuth>
        <Link/>
          </RequireAuth>
        )
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
    ]
  }
])

function App() {
  return(
    <UrlProvider>
      
    <RouterProvider router={router}/>
    </UrlProvider>
    )
    
  
}

export default App