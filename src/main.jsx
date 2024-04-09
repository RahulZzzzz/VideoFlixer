import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { Route, Router, createBrowserRouter } from 'react-router-dom'
import Subscription from './pages/Subscription.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import History from './pages/History.jsx'
import MyVideos from './pages/MyVideos.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import Login from './pages/Login.jsx'
import { ThemeProvider } from './components/ContextProvider/ThemeProvider.jsx'
import Signup from './pages/Signup.jsx'
import Playlists from './pages/Playlists.jsx'
import Playlist from './pages/Playlist.jsx'
import ProfileHome from './pages/profile/ProfileHome.jsx'
import ProfileVideos from './pages/profile/ProfileVideos.jsx'
import ProfileChannels from './pages/profile/ProfileChannels.jsx'
import ProfilePlaylists from './pages/profile/ProfilePlaylists.jsx'
import ProfileSubscribers from './pages/profile/ProfileSubscribers.jsx'
import ProfileTweets from './pages/profile/ProfileTweets.jsx'
import Video from './pages/Video.jsx'
import { SidebarProvider } from './components/ContextProvider/SidebarProvider.jsx'
import ProfileManageVideos from './pages/profile/ProfileManageVideos.jsx'
import Protected from './Authenticate.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
            <Protected authentication={false}>
                <Home />
            </Protected>
        )
      },
      {
        path: "/subscription",
        element: (
          <Protected authentication>
              <Subscription />
          </Protected>
        ),
      },
      {
        path: "/playlist",
        element: (
          <Protected authentication>
              <Playlists />
          </Protected>
        ),
      },
      {
        path: "/playlistvideos/:playlistId",
        element:(
          <Protected authentication>
              <Playlist />
          </Protected>
        )
      },
      {
        path: "/my-videos",
        element: (
          <Protected authentication>
              <MyVideos />
          </Protected>
        ),
      },
      {
        path: "/profile/:userId/",
        element: (
          <Protected authentication>
              <Profile />
          </Protected>
        ),
        children: [
          {
            path:"",
            element:<ProfileHome/>,
          },
          {
            path:"videos",
            element:<ProfileVideos/>
          },
          {
            path:"channels",
            element:<ProfileChannels/>
          },
          {
            path:"playlists",
            element:<ProfilePlaylists/>
          },
          {
            path:"tweets",
            element:<ProfileTweets/>
          },
          {
            path:"subscribers",
            element:<ProfileSubscribers/>
          },
          {
            path:"manage-videos",
            element:<ProfileManageVideos/>
          },
        ],
        errorElement: <div>Error</div>
      }, 
      {
        path: "/history",
        element: (
          <Protected authentication>
              <History />
          </Protected>
        )
      },
      {
        path: "/video/:videoId",
        element: (
          <Protected authentication>
              <Video />
          </Protected>
        )
      }     
    ],
    errorElement: <div className=' text-4xl '>404 Not Found</div>
  },
  {
    path:"/login",
    element:(<Protected authentication={false}>
          <Login/>
        </Protected>)
  },
  {
    path: "/signup",
    element: (<Protected authentication={false}>
      <Signup/>
    </Protected>)
  },
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
    </Provider>,
)
